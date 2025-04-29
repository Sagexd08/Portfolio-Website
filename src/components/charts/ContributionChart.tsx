import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface ContributionData {
  date: string;
  count: number;
}

interface ContributionChartProps {
  data: ContributionData[];
  width?: number;
  height?: number;
  cellSize?: number;
  cellGap?: number;
  colorRange?: string[];
}

const ContributionChart: React.FC<ContributionChartProps> = ({
  data,
  width = 800,
  height = 200,
  cellSize = 12,
  cellGap = 2,
  colorRange = ['#1f2937', '#4f46e5', '#6366f1', '#818cf8', '#a5b4fc'],
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Parse dates
    const parsedData = data.map(d => ({
      date: new Date(d.date),
      count: d.count,
    }));

    // Find min and max dates
    const dateExtent = d3.extent(parsedData, d => d.date) as [Date, Date];
    const startDate = dateExtent[0];
    const endDate = dateExtent[1];

    // Find max count for color scale
    const maxCount = d3.max(parsedData, d => d.count) || 0;

    // Create color scale
    const colorScale = d3.scaleQuantize<string>()
      .domain([0, maxCount])
      .range(colorRange);

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: auto;');

    // Create a group for the cells
    const g = svg.append('g')
      .attr('transform', `translate(${width * 0.05}, ${height * 0.1})`);

    // Create time scale for x-axis
    const timeScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([0, width * 0.9]);

    // Create weeks array (for y-axis)
    const weeks = d3.timeWeeks(
      d3.timeWeek.floor(startDate),
      d3.timeWeek.ceil(endDate)
    );

    // Create days array
    const days = d3.timeDays(
      d3.timeDay.floor(startDate),
      d3.timeDay.ceil(endDate)
    );

    // Draw cells
    g.selectAll('rect')
      .data(days)
      .enter()
      .append('rect')
      .attr('width', cellSize - cellGap)
      .attr('height', cellSize - cellGap)
      .attr('x', d => {
        const weekOfYear = d3.timeWeek.count(d3.timeYear(d), d);
        return weekOfYear * cellSize;
      })
      .attr('y', d => {
        return d.getDay() * cellSize;
      })
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('fill', d => {
        const matchingData = parsedData.find(item => 
          item.date.toDateString() === d.toDateString()
        );
        return matchingData ? colorScale(matchingData.count) : colorRange[0];
      })
      .attr('data-date', d => d.toISOString())
      .attr('data-count', d => {
        const matchingData = parsedData.find(item => 
          item.date.toDateString() === d.toDateString()
        );
        return matchingData ? matchingData.count : 0;
      })
      .on('mouseover', function(event, d) {
        const count = d3.select(this).attr('data-count');
        const date = new Date(d3.select(this).attr('data-date'));
        
        // Show tooltip
        const tooltip = svg.append('g')
          .attr('class', 'tooltip')
          .attr('transform', `translate(${parseFloat(d3.select(this).attr('x')) + width * 0.05}, ${parseFloat(d3.select(this).attr('y')) + height * 0.1 - 20})`);
        
        tooltip.append('rect')
          .attr('width', 120)
          .attr('height', 40)
          .attr('rx', 4)
          .attr('ry', 4)
          .attr('fill', '#1f2937')
          .attr('opacity', 0.9);
        
        tooltip.append('text')
          .attr('x', 10)
          .attr('y', 15)
          .attr('fill', 'white')
          .text(`${date.toDateString()}`);
        
        tooltip.append('text')
          .attr('x', 10)
          .attr('y', 30)
          .attr('fill', 'white')
          .text(`${count} contributions`);
      })
      .on('mouseout', function() {
        svg.select('.tooltip').remove();
      });

    // Add month labels
    const monthLabels = d3.timeMonths(startDate, endDate);
    
    g.selectAll('.month-label')
      .data(monthLabels)
      .enter()
      .append('text')
      .attr('class', 'month-label')
      .attr('x', d => {
        const weekOfYear = d3.timeWeek.count(d3.timeYear(d), d);
        return weekOfYear * cellSize;
      })
      .attr('y', -5)
      .attr('fill', '#a1a1aa')
      .attr('font-size', '10px')
      .text(d => d3.timeFormat('%b')(d));

    // Add day labels
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    g.selectAll('.day-label')
      .data(dayLabels)
      .enter()
      .append('text')
      .attr('class', 'day-label')
      .attr('x', -25)
      .attr('y', (d, i) => i * cellSize + cellSize / 2)
      .attr('fill', '#a1a1aa')
      .attr('font-size', '10px')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'middle')
      .text(d => d);

  }, [data, width, height, cellSize, cellGap, colorRange]);

  return (
    <motion.div
      className="w-full overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <svg ref={svgRef} className="mx-auto"></svg>
      <div className="flex justify-center items-center mt-4 text-sm text-light/70">
        <span className="mr-2">Less</span>
        <div className="flex space-x-1">
          {colorRange.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
        <span className="ml-2">More</span>
      </div>
    </motion.div>
  );
};

export default ContributionChart;

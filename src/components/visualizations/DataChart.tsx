import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export interface ChartData {
  x: number;
  y: number;
  label?: string;
}

interface DataChartProps {
  data: ChartData[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  title?: string;
  color?: string;
  curveType?: 'linear' | 'curve' | 'step';
  showDots?: boolean;
  showArea?: boolean;
  animated?: boolean;
  grid?: boolean;
}

const DataChart: React.FC<DataChartProps> = ({
  data,
  width = 600,
  height = 400,
  marginTop = 40,
  marginRight = 30,
  marginBottom = 60,
  marginLeft = 60,
  xAxisLabel = 'X Axis',
  yAxisLabel = 'Y Axis',
  title,
  color = '#6366f1',
  curveType = 'curve',
  showDots = true,
  showArea = true,
  animated = true,
  grid = true
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width, height });
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const containerWidth = svgRef.current.parentElement?.clientWidth || width;
        const containerHeight = height;
        setDimensions({ width: containerWidth, height: containerHeight });
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial measurement
    
    return () => window.removeEventListener('resize', handleResize);
  }, [height, width]);
  
  // Create and update the visualization
  useEffect(() => {
    if (!svgRef.current || !data.length) return;
    
    // Calculate the inner dimensions
    const innerWidth = dimensions.width - marginLeft - marginRight;
    const innerHeight = dimensions.height - marginTop - marginBottom;
    
    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove();
    
    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
      .style('overflow', 'visible');
    
    // Create scales
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.x) || 0, d3.max(data, d => d.x) || 1])
      .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y) || 1])
      .range([innerHeight, 0])
      .nice();
    
    // Create a group for the chart content
    const chartGroup = svg.append('g')
      .attr('transform', `translate(${marginLeft}, ${marginTop})`);
    
    // Add grid if enabled
    if (grid) {
      // Add y-grid
      chartGroup.append('g')
        .attr('class', 'grid y-grid')
        .call(d3.axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
        )
        .style('color', 'rgba(255, 255, 255, 0.1)');
      
      // Add x-grid
      chartGroup.append('g')
        .attr('class', 'grid x-grid')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale)
          .tickSize(-innerHeight)
          .tickFormat(() => '')
        )
        .style('color', 'rgba(255, 255, 255, 0.1)');
    }
    
    // Create a line generator
    let line: d3.Line<ChartData>;
    
    if (curveType === 'linear') {
      line = d3.line<ChartData>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));
    } else if (curveType === 'curve') {
      line = d3.line<ChartData>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveMonotoneX);
    } else {
      line = d3.line<ChartData>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveStepAfter);
    }
    
    // Add area if enabled
    if (showArea) {
      const area = d3.area<ChartData>()
        .x(d => xScale(d.x))
        .y0(innerHeight)
        .y1(d => yScale(d.y));
      
      if (curveType === 'curve') {
        area.curve(d3.curveMonotoneX);
      } else if (curveType === 'step') {
        area.curve(d3.curveStepAfter);
      }
      
      // Add area path
      const areaPath = chartGroup.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('fill', `${color}`)
        .attr('fill-opacity', 0.1)
        .attr('d', area);
      
      // Animate area if enabled
      if (animated) {
        areaPath
          .attr('fill-opacity', 0)
          .transition()
          .duration(1000)
          .attr('fill-opacity', 0.1);
      }
    }
    
    // Add line path
    const linePath = chartGroup.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line);
    
    // Animate line if enabled
    if (animated) {
      const pathLength = (linePath.node() as SVGPathElement).getTotalLength();
      
      linePath
        .attr('stroke-dasharray', pathLength)
        .attr('stroke-dashoffset', pathLength)
        .transition()
        .duration(1500)
        .attr('stroke-dashoffset', 0);
    }
    
    // Add dots if enabled
    if (showDots) {
      const dots = chartGroup.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 4)
        .attr('fill', color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);
      
      // Animate dots if enabled
      if (animated) {
        dots
          .attr('opacity', 0)
          .attr('r', 0)
          .transition()
          .delay((_, i) => i * 100)
          .duration(500)
          .attr('opacity', 1)
          .attr('r', 4);
      }
      
      // Add tooltips
      dots.append('title')
        .text(d => `(${d.x}, ${d.y})${d.label ? ` - ${d.label}` : ''}`);
    }
    
    // Add axes
    const xAxis = chartGroup.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .style('color', 'rgba(255, 255, 255, 0.7)');
    
    const yAxis = chartGroup.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale))
      .style('color', 'rgba(255, 255, 255, 0.7)');
    
    // Add axis labels
    chartGroup.append('text')
      .attr('class', 'x-axis-label')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + marginBottom - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(255, 255, 255, 0.7)')
      .text(xAxisLabel);
    
    chartGroup.append('text')
      .attr('class', 'y-axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -marginLeft + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(255, 255, 255, 0.7)')
      .text(yAxisLabel);
    
    // Add title if provided
    if (title) {
      svg.append('text')
        .attr('class', 'chart-title')
        .attr('x', dimensions.width / 2)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .attr('fill', 'rgba(255, 255, 255, 0.9)')
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .text(title);
    }
  }, [data, dimensions, marginTop, marginRight, marginBottom, marginLeft, xAxisLabel, yAxisLabel, title, color, curveType, showDots, showArea, animated, grid]);
  
  return <svg ref={svgRef} className="data-chart" />;
};

export default DataChart;
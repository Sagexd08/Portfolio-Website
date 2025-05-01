import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  group: number;
  value: number;
  label?: string;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface NetworkData {
  nodes: Node[];
  links: Link[];
}

interface NetworkGraphProps {
  data: NetworkData;
  width?: number;
  height?: number;
  backgroundColor?: string;
  nodeColor?: string | ((node: Node) => string);
  linkColor?: string | ((link: Link) => string);
  animated?: boolean;
  showLabels?: boolean;
  interactive?: boolean;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({
  data,
  width = 600,
  height = 400,
  backgroundColor = 'transparent',
  nodeColor = '#6366f1',
  linkColor = '#a5b4fc',
  animated = true,
  showLabels = false,
  interactive = true
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
    if (!svgRef.current || !data.nodes.length) return;
    
    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove();
    
    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
      .style('background', backgroundColor);
    
    // Create the simulation
    const simulation = d3.forceSimulation<Node & d3.SimulationNodeDatum, Link & d3.SimulationLinkDatum<Node & d3.SimulationNodeDatum>>()
      .nodes(data.nodes as (Node & d3.SimulationNodeDatum)[])
      .force('link', d3.forceLink<Node & d3.SimulationNodeDatum, Link & d3.SimulationLinkDatum<Node & d3.SimulationNodeDatum>>()
        .id((d: any) => d.id)
        .links(data.links as (Link & d3.SimulationLinkDatum<Node & d3.SimulationNodeDatum>)[])
        .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collide', d3.forceCollide().radius(30));
    
    // Create a container for links
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', typeof linkColor === 'function' ? (d) => linkColor(d) : linkColor)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => Math.sqrt(d.value));
    
    // Create a container for nodes
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data.nodes)
      .enter()
      .append('g')
      .call(d3.drag<SVGGElement, Node & d3.SimulationNodeDatum>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any
      );
    
    // Add circles to each node
    node.append('circle')
      .attr('r', (d) => 5 + d.value * 2)
      .attr('fill', typeof nodeColor === 'function' ? (d) => nodeColor(d) : nodeColor)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);
    
    // Add pulse effect to nodes
    if (animated) {
      node.append('circle')
        .attr('r', (d) => 5 + d.value * 2)
        .attr('fill', typeof nodeColor === 'function' ? (d) => nodeColor(d) : nodeColor)
        .attr('opacity', 0.3)
        .attr('class', 'pulse');
    }
    
    // Add labels if requested
    if (showLabels) {
      node.append('text')
        .attr('dx', 12)
        .attr('dy', '.35em')
        .text((d) => d.label || d.id)
        .attr('fill', '#fff')
        .attr('font-size', '10px')
        .attr('font-family', 'sans-serif');
    }
    
    // Add title for tooltips
    node.append('title')
      .text((d) => `${d.label || d.id} (Value: ${d.value})`);
    
    // Handle simulation ticks
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });
    
    // Add animations for pulse effect
    if (animated) {
      svg.selectAll('.pulse')
        .each(function(this: SVGCircleElement) {
          const circle = d3.select(this);
          
          (function repeat() {
            circle
              .transition()
              .duration(1500)
              .attr('r', function(this: SVGCircleElement) {
                return parseFloat(d3.select(this.parentNode as any).select('circle').attr('r')) * 2;
              })
              .attr('opacity', 0)
              .on('end', function() {
                d3.select(this)
                  .attr('r', function(this: SVGCircleElement) {
                    return parseFloat(d3.select(this.parentNode as any).select('circle').attr('r'));
                  })
                  .attr('opacity', 0.3)
                  .call(() => repeat());
              });
          })();
        });
    }
    
    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      if (!interactive) {
        d.fx = null;
        d.fy = null;
      }
    }
    
    // Clean up
    return () => {
      simulation.stop();
    };
  }, [data, dimensions, backgroundColor, nodeColor, linkColor, animated, showLabels, interactive]);
  
  return <svg ref={svgRef} className="network-graph" />;
};

export default NetworkGraph;
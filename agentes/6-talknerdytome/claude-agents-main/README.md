# Claude Agents

A collection of specialized AI agents for competitive intelligence and digital marketing analysis, powered by Claude and MCP servers.

## Overview

This repository contains Claude agent configurations designed to perform advanced competitive analysis across multiple digital channels. Each agent specializes in extracting actionable intelligence from different data sources, enabling comprehensive market research and competitive benchmarking.

## Available Agents

### 🔍 Website Intelligence Agent (`website-intel`)

Analyzes competitor websites for strategic intelligence including messaging evolution, ICP shifts, positioning changes, and pricing/packaging adjustments.

**Key Capabilities:**
- Strategic content discovery and mapping
- Structured data extraction for messaging and positioning
- Pricing and packaging intelligence
- Feature comparison and parity analysis
- Customer testimonial and case study analysis

**Best For:**
- Tracking competitor positioning changes
- Understanding market messaging trends
- Identifying pricing strategy shifts
- Discovering feature differentiation opportunities

### 📘 Meta Ads Library Agent (`meta-ads-library`)

Specializes in analyzing Facebook/Meta advertising strategies through the Ads Library API, providing deep insights into competitor campaigns.

**Key Capabilities:**
- Single-brand deep campaign analysis
- Multi-competitor benchmarking
- Creative pattern recognition
- Messaging architecture deconstruction
- Strategic positioning mapping

**Best For:**
- Understanding competitor Facebook ad strategies
- Identifying creative trends and patterns
- Analyzing messaging frameworks
- Discovering market positioning gaps

### 🔎 Google Ads Library Agent (`google-ads-library`)

Analyzes competitor advertising strategies on Google's ad network through the Ads Transparency Center.

**Key Capabilities:**
- Domain-based ad discovery
- Multi-format ad analysis (text, display, video)
- Campaign pattern identification
- Cross-competitor comparison

**Best For:**
- Google Ads competitive research
- Search advertising analysis
- Display campaign benchmarking
- Video ad strategy insights

## Installation

### Prerequisites

1. **Claude Desktop** - Install from [claude.ai](https://claude.ai)
2. **MCP Servers** - Required MCP servers for full functionality:
   - [Firecrawl MCP Server](https://github.com/firecrall/firecrawl-mcp) - For website scraping
   - [Facebook Ads Library MCP](https://github.com/talknerdytome-labs/facebook-ads-library-mcp) - For Meta ads data
   - [Google Ads Library MCP](https://github.com/talknerdytome-labs/google-ads-library-mcp) - For Google ads data

### Setup

1. Clone this repository:
```bash
git clone https://github.com/talknerdytome/claude-agents.git
cd claude-agents
```

2. Configure Claude Desktop to recognize the agents directory:
   - Open Claude Desktop settings
   - Navigate to Developer > Custom Instructions
   - Add the path to the `agents` directory

3. Install and configure required MCP servers following their respective documentation

## Usage

### Using Website Intelligence Agent

```
User: "Analyze competitor.com for their current pricing strategy and value propositions"

Claude: I'll use the website-intel agent to analyze competitor.com's pricing and positioning...
```

### Using Meta Ads Library Agent

```
User: "Show me what Facebook ads Nike is currently running"

Claude: I'll use the meta-ads-library agent to analyze Nike's current Facebook advertising campaigns...
```

### Multi-Competitor Analysis

```
User: "Compare the advertising strategies of Apple, Samsung, and Google"

Claude: I'll deploy multiple agents to perform a comprehensive competitive analysis across these brands...
```

## Agent Configuration

Each agent is defined by a YAML frontmatter configuration specifying:

- **name**: Agent identifier
- **description**: When and how to use the agent
- **tools**: Available MCP tools and capabilities
- **model**: Claude model to use (or inherit)
- **color**: Visual identifier in Claude Desktop

Example configuration:
```yaml
---
name: website-intel
description: Analyzes competitor websites for strategic intelligence
tools: Firecrawl, WebFetch, TodoWrite, WebSearch
model: inherit
color: yellow
---
```

## Advanced Features

### Batch Processing
Agents support batch operations for analyzing multiple competitors simultaneously, maximizing efficiency and enabling direct comparisons.

### Structured Data Extraction
Custom JSON schemas enable precise extraction of specific data points like pricing tiers, feature sets, and messaging frameworks.

### Intelligent Caching
Media analysis results are cached to avoid redundant processing and improve response times.

### Comparative Analysis
Built-in capabilities for side-by-side competitor comparisons, gap analysis, and market positioning maps.

## Best Practices

1. **Start Broad, Then Focus**: Begin with website mapping or general discovery before drilling into specific areas
2. **Use Batch Operations**: When analyzing multiple competitors, leverage batch processing for efficiency
3. **Combine Agents**: Use multiple agents together for comprehensive competitive intelligence
4. **Regular Monitoring**: Schedule periodic analyses to track changes over time
5. **Verify Data**: Cross-reference findings across multiple sources when possible

## Output Examples

### Executive Summary Format
- Key findings (3-5 bullet points)
- Strategic implications
- Actionable recommendations
- Competitive opportunities/threats

### Detailed Analysis Includes
- Current state assessment
- Comparative matrices
- Trend identification
- Strategic recommendations
- Data confidence levels

## Limitations

- Respects robots.txt and rate limits
- Analyzes only publicly available information
- Requires active MCP server connections
- Some dynamic content may require multiple extraction attempts

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:
- Adding new agents
- Improving existing capabilities
- Reporting issues
- Suggesting enhancements

## License

MIT License - See [LICENSE](LICENSE) file for details

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the maintainers
- Check the [documentation](docs/) for detailed guides

## Related Projects

- [Facebook Ads Library MCP](https://github.com/talknerdytome-labs/facebook-ads-library-mcp)
- [Google Ads Library MCP](https://github.com/talknerdytome-labs/google-ads-library-mcp)

---

Built with ❤️ by [Talk Nerdy To Me Labs ](https://youtube.com/@talknerdytome88?sub_confirmation=1)

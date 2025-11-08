import { McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { z } from 'zod';

// Create an MCP server
const server = new McpServer({
    name: 'demo-server',
    version: '1.0.0'
});

// Add an addition tool
server.registerTool(
    'addTwoNumbers',
    {
        title: 'Add Two Numbers',
        description: 'Add two numbers together',
        inputSchema: {
            a: z.number().describe('The first number'), b: z.number().describe('The second number')
        }
      
    },
    async ({ a, b }) => {
        return {
            content: [{ type: 'text', text:String(a + b) }],
            
        };
    }
);

const transport = new StdioServerTransport();

// Start the server
await server.connect(transport);
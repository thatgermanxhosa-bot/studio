import * as fs from 'fs';
import * as path from 'path';

describe('MCP Configuration', () => {
  let mcpConfig: any;

  beforeAll(() => {
    const mcpPath = path.resolve(__dirname, 'mcp.json');
    const mcpContent = fs.readFileSync(mcpPath, 'utf-8');
    mcpConfig = JSON.parse(mcpContent);
  });

  it('should have mcpServers configuration', () => {
    expect(mcpConfig.mcpServers).toBeDefined();
  });

  describe('Firebase MCP Server', () => {
    it('should have a firebase configuration', () => {
      expect(mcpConfig.mcpServers.firebase).toBeDefined();
    });

    it('should have the correct command', () => {
      expect(mcpConfig.mcpServers.firebase.command).toBe('npx');
    });

    it('should have the correct arguments', () => {
      const expectedArgs = [
        '-y',
        'firebase-tools@latest',
        'experimental:mcp',
        '--only',
        'auth,firestore',
      ];
      expect(mcpConfig.mcpServers.firebase.args).toEqual(expectedArgs);
    });
  });
});

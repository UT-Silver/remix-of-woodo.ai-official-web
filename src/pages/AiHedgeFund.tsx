import { Layout } from '@ahf/components/Layout';
import { Toaster } from '@ahf/components/ui/sonner';
import { NodeProvider } from '@ahf/contexts/node-context';
import { ThemeProvider } from '@ahf/providers/theme-provider';
import '@xyflow/react/dist/style.css';
import '@ahf/ahf-scoped.css';

const AiHedgeFund = () => {
  return (
    <ThemeProvider>
      <NodeProvider>
        <div className="ahf-root dark" style={{ height: 'calc(100vh - 90px)', width: '100%', position: 'relative' }}>
          <Layout />
          <Toaster />
        </div>
      </NodeProvider>
    </ThemeProvider>
  );
};

export default AiHedgeFund;

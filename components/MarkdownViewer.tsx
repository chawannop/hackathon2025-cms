import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, useTheme } from '@mui/material';

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        '& .markdown-body': {
          color: theme.palette.text.primary,
          '& pre': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: 2,
            borderRadius: 1,
            overflow: 'auto',
          },
          '& code': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '0.2em 0.4em',
            borderRadius: '3px',
            fontSize: '85%',
          },
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            color: theme.palette.text.primary,
            marginTop: 2,
            marginBottom: 1,
          },
          '& p': {
            marginBottom: 1,
          },
          '& ul, & ol': {
            paddingLeft: 3,
          },
          '& blockquote': {
            borderLeft: `4px solid ${theme.palette.divider}`,
            paddingLeft: 2,
            margin: 0,
            marginBottom: 1,
            color: theme.palette.text.secondary,
          },
          '& table': {
            borderCollapse: 'collapse',
            width: '100%',
            marginBottom: 2,
            '& th, & td': {
              border: `1px solid ${theme.palette.divider}`,
              padding: 1,
            },
            '& th': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
          },
          '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      }}
    >
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </Box>
  );
} 
'use client';

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components';
import { CheckCircleIcon, CopyIcon } from '@repo/ui/components/icons';
import { useState } from 'react';

const CopyButton = ({ label, value }: { label: string; value: string }) => {
  window.alert(window.isSecureContext);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Tooltip open={isCopied}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard()}
          className="shrink-0 transition-colors"
        >
          {isCopied ? (
            <CheckCircleIcon color="green" className="h-4 w-4" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}をコピーしました！</TooltipContent>
    </Tooltip>
  );
};

export default CopyButton;

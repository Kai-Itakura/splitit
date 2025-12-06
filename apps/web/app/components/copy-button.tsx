'use client';

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components';
import {
  CheckCircleIcon,
  CopyIcon,
  XCircleIcon,
} from '@repo/ui/components/icons';
import { useState } from 'react';

const COPY_STATUS = {
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

type CopyState =
  | {
      status: typeof COPY_STATUS.IDLE;
    }
  | { status: typeof COPY_STATUS.SUCCESS; text: string }
  | { status: typeof COPY_STATUS.ERROR; text: string };

const CopyButton = ({ label, value }: { label: string; value: string }) => {
  const [copiedText, setCopiedText] = useState<CopyState>({
    status: COPY_STATUS.IDLE,
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedText({
        status: COPY_STATUS.SUCCESS,
        text: `${label}をコピーしました！`,
      });
    } catch {
      setCopiedText({
        status: COPY_STATUS.ERROR,
        text: 'コピーに失敗しました。',
      });
    }
    setTimeout(() => setCopiedText({ status: COPY_STATUS.IDLE }), 2000);
  };

  return (
    <Tooltip open={copiedText.status != COPY_STATUS.IDLE}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard()}
          className="shrink-0 transition-colors"
        >
          {copiedText.status === COPY_STATUS.SUCCESS ? (
            <CheckCircleIcon color="green" className="h-4 w-4" />
          ) : copiedText.status === COPY_STATUS.ERROR ? (
            <XCircleIcon color="red" className="h-4 w-4" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      {copiedText.status !== COPY_STATUS.IDLE && (
        <TooltipContent>{copiedText.text}</TooltipContent>
      )}
    </Tooltip>
  );
};

export default CopyButton;

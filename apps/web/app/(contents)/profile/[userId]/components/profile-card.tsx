'use client';

import CopyButton from '@/app/components/copy-button';
import { Card, CardContent } from '@repo/ui/components';
import { Hash, Mail } from '@repo/ui/components/icons';

type IconVariants = keyof typeof ICON_VARIANTS;

const ICON_VARIANTS = {
  hash: Hash,
  mail: Mail,
};

const ProfileCard = ({
  label,
  value,
  iconVariants,
}: {
  label: string;
  value: string;
  iconVariants: IconVariants;
}) => {
  const Icon = ICON_VARIANTS[iconVariants];

  return (
    <Card className="border border-border/50 hover:border-border transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium text-muted-foreground">
                {label}
              </p>
            </div>
            <p className="mt-3 break-all font-mono text-sm text-foreground">
              {value}
            </p>
          </div>
          <CopyButton label={label} value={value} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;

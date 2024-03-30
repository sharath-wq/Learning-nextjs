'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { toast } from '@/components/ui/use-toast';

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ endpoint, onChange }: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => onChange(res?.[0].url)}
            onUploadError={(err: Error) => {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: `${err?.message}`,
                });
            }}
        />
    );
};

'use client';

import { ConfirmModel } from '@/components/models/ConfirmModel';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { AwardIcon, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
}

export const ChapterActions = ({ chapterId, courseId, disabled, isPublished }: ChapterActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
            toast({
                description: 'Chapter deleted.',
            });
            router.refresh();
            router.push(`/teacher/courses/${courseId}`);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex items-center gap-x-2'>
            <Button onClick={() => {}} disabled={disabled || isLoading} variant={'outline'} size={'sm'}>
                {isPublished ? 'Unpublish' : 'Publish'}
            </Button>
            <ConfirmModel onConfirm={onDelete}>
                <Button size={'sm'} disabled={isLoading}>
                    <Trash className='h-4 w-4' />
                </Button>
            </ConfirmModel>
        </div>
    );
};

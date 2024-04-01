'use client';

import { ConfirmModel } from '@/components/models/ConfirmModel';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import axios from 'axios';
import { AwardIcon, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
}

export const Actions = ({ courseId, disabled, isPublished }: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast({
                    description: 'Course unpublished.',
                });
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast({
                    description: 'Course published.',
                });
                confetti.onOpen();
            }
            router.refresh();
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

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}`);
            toast({
                description: 'Course deleted.',
            });
            router.refresh();
            router.push(`/teacher/courses`);
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
            <Button onClick={onClick} disabled={disabled || isLoading} variant={'outline'} size={'sm'}>
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

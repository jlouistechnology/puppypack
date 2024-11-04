import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Sparkles, ClipboardCheck, PartyPopper } from 'lucide-react';
import { toast } from 'sonner';
import type { GuidanceTask } from '../lib/generateGuidance';
import LoadingSpinner from './LoadingSpinner';
import ConfirmDialog from './ConfirmDialog';

interface WeeklyGuidanceProps {
  puppy: {
    id: string;
    name: string;
  } | null;
  currentWeek: number;
  onAskWaggles: (question: string) => void;
  forceRefresh?: number;
}

export default function WeeklyGuidance({ puppy, currentWeek, onAskWaggles, forceRefresh }: WeeklyGuidanceProps) {
  const [tasks, setTasks] = useState<GuidanceTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<GuidanceTask | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionTask, setActionTask] = useState<{ task: GuidanceTask; action: 'complete' | 'ignore' } | null>(null);
  const [updatingTasks, setUpdatingTasks] = useState<Set<string>>(new Set());

  const fetchTasks = async () => {
    if (!puppy?.id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('puppy_guidance')
        .select('*')
        .eq('puppy_id', puppy.id)
        .eq('week', currentWeek)
        .eq('completed', false)
        .eq('ignored', false)
        .order('priority');

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load weekly tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [puppy?.id, currentWeek, forceRefresh]);

  const handleTaskAction = async (taskId: string, action: 'complete' | 'ignore') => {
    setUpdatingTasks(prev => new Set(prev).add(taskId));

    try {
      const { error } = await supabase
        .from('puppy_guidance')
        .update({
          completed: action === 'complete',
          ignored: action === 'ignore'
        })
        .eq('id', taskId);

      if (error) throw error;

      // Remove the task from the list
      setTasks(prev => prev.filter(task => task.id !== taskId));
      
      toast.success(action === 'complete' ? 'Task completed!' : 'Task ignored');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    } finally {
      setUpdatingTasks(prev => {
        const next = new Set(prev);
        next.delete(taskId);
        return next;
      });
    }
  };

  const confirmTaskAction = (task: GuidanceTask, action: 'complete' | 'ignore') => {
    setActionTask({ task, action });
    setShowConfirmDialog(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-2">Your Personalized Plan</h3>
      <p className="text-gray-600 mb-6">
        {tasks.length > 0 
          ? `Focus on these key activities this week to ensure ${puppy?.name}'s healthy development and training progress.`
          : tasks.length === 0 && !loading
            ? `Complete ${puppy?.name}'s first assessment to get your personalized training plan and recommendations!`
            : ''}
      </p>
      
      {tasks.length > 0 ? (
        <div className="space-y-4">
          {tasks.map(task => (
            <div 
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors cursor-pointer relative bg-white"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="text-gray-600 mt-1">{task.summary}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmTaskAction(task, 'complete');
                    }}
                    disabled={updatingTasks.has(task.id)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-1"
                  >
                    {updatingTasks.has(task.id) && <LoadingSpinner size="sm" className="text-white" />}
                    <span>Mark Complete</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmTaskAction(task, 'ignore');
                    }}
                    disabled={updatingTasks.has(task.id)}
                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : loading ? null : tasks.length === 0 && puppy ? (
        <div className="text-center py-12 bg-purple-50 rounded-lg">
          {loading ? (
            <LoadingSpinner size="lg" />
          ) : !puppy ? (
            <ClipboardCheck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          ) : (
            <>
              <PartyPopper className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">All Tasks Completed!</h4>
              <p className="text-gray-600 max-w-md mx-auto">
                Great job! You've completed all tasks for this week. Keep up the excellent work with {puppy.name}!
              </p>
            </>
          )}
        </div>
      ) : null}

      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{selectedTask.title}</h3>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{selectedTask.details}</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    onAskWaggles(`Tell me more about ${selectedTask.title}. Specifically, ${selectedTask.summary}`);
                    setSelectedTask(null);
                  }}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Ask Waggles For Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
          setActionTask(null);
        }}
        onConfirm={() => {
          if (actionTask) {
            handleTaskAction(actionTask.task.id, actionTask.action);
          }
        }}
        title={actionTask?.action === 'complete' ? 'Complete Task' : 'Ignore Task'}
        message={actionTask?.action === 'complete' 
          ? 'Are you sure you want to mark this task as complete?' 
          : 'Are you sure you want to ignore this task? You can always come back to it later.'}
        confirmText={actionTask?.action === 'complete' ? 'Complete' : 'Ignore'}
        type={actionTask?.action === 'complete' ? 'info' : 'warning'}
      />
    </div>
  );
}
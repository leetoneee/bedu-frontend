'use client'

import Breadcrumb from '@/components/Breadcrumb';
import { Crumb } from '@/types';
import { Divider } from '@nextui-org/react';
import { useState } from 'react';
import TuitionHeader from './TuitionHeader';
import SSPTab from './SSP.Tab';
import LPTab from './LP.Tab';

export default function TuitionPage() {
  const crumbs: Crumb[] = [
    {
      label: 'Tuition Fees',
      href: '/manager/tuition-fees'
    }
  ];
  const [activeTab, setActiveTab] = useState<string>('Self-study Program');

  return (
    <main className="flex flex-col items-center gap-4 p-4 sm:items-start">
      <Breadcrumb crumbs={crumbs} />
      <Divider />
      <div className="flex w-full flex-col">
        <TuitionHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <Divider />
        {activeTab === 'Self-study Program' && <SSPTab />}
        {activeTab === 'Live Program' && <LPTab />}
      </div>
      {/* <AddCourseModal
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      onCreated={handleCreated}
    />
    {isOpenE && selectedCourse && (
      <EditCourseModal
        isOpen={isOpenE}
        onOpen={onOpenE}
        onOpenChange={onOpenChangeE}
        course={selectedCourse}
        onClose={handleCloseEditModal}
        onEdited={handleEdited}
      />
    )}
    {isOpenD && selectedCourse && (
      <DeleteCourseModal
        isOpen={isOpenD}
        onOpen={onOpenD}
        onOpenChange={onOpenChangeD}
        onClose={handleCloseDeleteModal}
        courseId={selectedCourse.id}
        courseTitle={selectedCourse.title}
        onDeleted={handleDeleted}
      />
    )} */}
    </main>
  );
}

import React from 'react';

const Record = ({ filename, size, type }) => {
  return (
    <div class="flex flex-col rounded-md shadow-md">
        <div class="p-2 flex flex-col items-center">
            <span class="fas fa-file-pdf text-5xl"></span>
            <h3 class="mt-5 mb-2 text-bookmark-blue text-lg">{filename}</h3>
        </div>
        <div class="flex justify-between px-4 pb-4 items-center">
            <h4 class="text-sm text-gray-600">{size}</h4>
            <h4 class="text-sm text-gray-600 bg-pink-400 px-2 py-1 rounded-md border-1 border-pink-500">{type}</h4>
        </div>
    </div>
  );
};

export default Record;
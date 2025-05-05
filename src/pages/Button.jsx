import React, { useState } from 'react';

function CopyButton() {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('5614681000127690');
      setCopySuccess('✅ Nusxa olindi!');
    } catch (err) {
      setCopySuccess('❌ Nusxa olishda xatolik yuz berdi');
    }

    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <div>
      <button
        onClick={handleCopy}
        className="px-4 py-2 text-white rounded bg-teal-800"
      >
        5614 6810 0012 7690
      </button>
      {copySuccess && <p>{copySuccess}</p>}
    </div>
  );
}

export default CopyButton;

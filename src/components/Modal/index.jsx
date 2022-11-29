import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({ children, title }) {
  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50">
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div
                className="border-b border-solid border-slate-200 rounded-t p-5 text-xl font-bold"
              >
                {title}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

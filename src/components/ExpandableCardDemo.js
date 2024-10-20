import React, { useState, useId, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick";  // Import the hook
import Image from "next/image";
import CloseIcon from "./CloseIcon";  // Optional, reusable close icon component

export function ExpandableCardDemo({ topics }) {
  const [active, setActive] = useState(null);  // Manage which card is expanded
  const id = useId();
  const ref = useRef(null);  // Reference for outside click detection

  useOutsideClick(ref, () => setActive(null));  // Close card on outside click

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover"
                />
              </motion.div>

              <div className="flex justify-between items-start p-4">
                <div>
                  <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-medium text-neutral-700 dark:text-neutral-200">
                    {active.title}
                  </motion.h3>
                  <motion.p layoutId={`description-${active.description}-${id}`} className="text-neutral-600 dark:text-neutral-400">
                    {active.description}
                  </motion.p>
                </div>
                <button className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white" onClick={() => setActive(null)}>
                  <CloseIcon />  {/* Optional reusable close icon */}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            layoutId={`card-${topic.title}-${id}`}
            onClick={() => setActive(topic)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.h3 layoutId={`title-${topic.title}-${id}`} className="font-medium text-neutral-800 dark:text-neutral-200 text-center">
                {topic.title}
              </motion.h3>
              <motion.p layoutId={`description-${topic.description}-${id}`} className="text-neutral-600 dark:text-neutral-400 text-center">
                Click to see more details about {topic.title}.
              </motion.p>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

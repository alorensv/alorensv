// @ts-ignore
import { useState } from "react";

type Project = {
  featured?: boolean;
  type?: string;
  image?: string;
  title?: string;
  description?: string;
  front?: string;
  front2?: string;
  back?: string;
}

type ModalCustomProps = {
  children: any;
  project: Project;
}

const ModalCustom = ({ children, project }: ModalCustomProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
          style={{ zIndex: 50 }}
        >
          <div className="bg-[#181818] rounded-lg w-[850px] max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
                aria-label="Cerrar modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="p-6">
                {/* Contenido del modal */}
                <div className="relative w-full h-[400px] mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{project.title}</h2>
                <p className="text-white/90 mb-4">{project.description}</p>
                <div className="flex gap-2 text-white/80">
                  {project.front && <span>{project.front}</span>}
                  {project.back && <span>&bull; {project.back}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCustom;
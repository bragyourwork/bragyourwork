import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Section = ({ id, content, moveSection, removeSection }) => {
  const [, ref] = useDrag({
    type: 'section',
    item: { id },
  });

  const [, drop] = useDrop({
    accept: 'section',
    hover: (draggedItem) => {
      if (draggedItem.id !== id) {
        moveSection(draggedItem.id, id);
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="section  p-4 my-2 bg-white">
      <div className="flex justify-between">
        {content}
        <button onClick={() => removeSection(id)} className="text-red-500">Remove</button>
      </div>
    </div>
  );
};

const AddContentMenu = ({ onAdd }) => {
  return (
    <div className="absolute bg-white border p-2 shadow-lg">
      <button onClick={() => onAdd('text')} className="block w-full">Add Text</button>
      <button onClick={() => onAdd('image')} className="block w-full">Add Image</button>
      <button onClick={() => onAdd('video')} className="block w-full">Add Video</button>
      <button onClick={() => onAdd('audio')} className="block w-full">Add Audio</button>
    </div>
  );
};

const BlogDesigner = () => {
  const [sections, setSections] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const addSection = (type) => {
    const newSection = { id: `${Date.now()}`, type, content: '' };

    if (type === 'text') {
      newSection.content = <textarea placeholder="Enter text here" className="w-full p-2 border" />;
    } else if (type === 'image') {
      newSection.content = (
        <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, newSection.id)} />
      );
    } else if (type === 'video' || type === 'audio') {
      newSection.content = (
        <input type="file" accept={`${type}/*`} onChange={(e) => handleFileSelect(e, newSection.id)} />
      );
    }

    setSections([...sections, newSection]);
    setShowMenu(false);
  };

  const moveSection = (draggedId, hoverId) => {
    const draggedIndex = sections.findIndex((section) => section.id === draggedId);
    const hoverIndex = sections.findIndex((section) => section.id === hoverId);
    const updatedSections = [...sections];
    const [draggedSection] = updatedSections.splice(draggedIndex, 1);
    updatedSections.splice(hoverIndex, 0, draggedSection);
    setSections(updatedSections);
  };

  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleFileSelect = (e, id) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, content: <img src={file} alt="Uploaded" /> } : section
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative p-4">
        {sections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            content={section.content}
            moveSection={moveSection}
            removeSection={removeSection}
          />
        ))}

        <button
          className="plus-icon bg-blue-500 text-white p-2 rounded-full"
          onClick={(e) => {
            setMenuPosition({ x: e.clientX, y: e.clientY });
            setShowMenu(!showMenu);
          }}
        >
          +
        </button>

        {showMenu && (
          <div style={{ top: menuPosition.y, left: menuPosition.x, position: 'absolute' }}>
            <AddContentMenu onAdd={addSection} />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default BlogDesigner;


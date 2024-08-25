import { useEffect, useState } from "react";
import "./HomePage.css";
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import DocumentCard from "../../components/documentCard/DocumentCard";
import { DocumentItem } from "../../utils/model";

const HomePage = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        setDocuments(data);
      } catch(err) {
        console.log(err);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape' && selectedDocument) {
        setSelectedDocument(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDocument]);

  useEffect(() => {
    if (hasChanged) {
      const timeoutId = setTimeout(() => {
        const saveData = async () => {
          setSaving(true);
          console.log("Saving...");
          try {
            await fetch("/api/items", {
              method: "POST",
              body: JSON.stringify(documents)
            });
            setLastSavedTime(new Date());
          } catch(err) {
            console.log(err);
          } finally {
            setSaving(false);
            console.log("Done Saving...");
          }
        }

        saveData();
        setHasChanged(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [documents, hasChanged]);

  console.log(saving);

  const handleDrag = (result: DropResult) => {
    if (!result.destination) return;

    const updatedItems = Array.from(documents);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    const newItems = updatedItems.map((item, index) => ({
      ...item,
      position: index
    }));

    setDocuments(newItems);
    setHasChanged(true);
  };

  const handleClick = (card: DocumentItem) => {
    setSelectedDocument(card);
  }

  const getLastSavedTime = () => {
    if (!lastSavedTime) return '';

    const now = new Date();
    const secondsSinceLastSave = Math.floor((now.getTime() - lastSavedTime.getTime()) / 1000);
    return `${secondsSinceLastSave} seconds ago`;
  }

  return (
    <>
      {saving && (
        <div>
          Saving {getLastSavedTime()}
        </div>
      )}
      {!saving && <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="documents" direction="horizontal">
              {(provided) => (
                  <div className="card-grid" {...provided.droppableProps} ref={provided.innerRef}>
                      {documents?.map((item, index) => (
                        <DocumentCard
                          key={item.position}
                          item={item}
                          index={index}
                          onDocumentClick={handleClick}
                        />
                      ))}
                      {provided.placeholder}
                  </div>
              )}
          </Droppable>
      </DragDropContext>}

      {selectedDocument && (
        <div className="overlay">
          <img src={selectedDocument.imageUrl} alt={selectedDocument.title} className="large-image" />
        </div>
      )}
    </>
  )
}

export default HomePage
import { useState } from 'react';
import { DocumentItem } from '../../utils/model';
import "./DocumentCard.css";
import { Draggable } from 'react-beautiful-dnd';
import { ClipLoader } from 'react-spinners';

interface DocumentItemProps {
  item: DocumentItem;
  index: number;
  onDocumentClick: (item: DocumentItem) => void;
}

const DocumentCard: React.FC<DocumentItemProps> = ({ item, index, onDocumentClick }) => {
  const [hasImageLoaded, setHasLoaded] = useState(false);

  const handleImageLoad = () => {
    setHasLoaded(true);
  }

  return (
    <Draggable key={item.position} draggableId={item.position.toString()} index={index}>
      {(provided) => (
        <div onClick={() => onDocumentClick(item)} className="document" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <h3>{item.title}</h3>
          {!hasImageLoaded && <div className="spinner">
              <ClipLoader />
          </div>}
          <img
            src={item.imageUrl}
            alt={item.title}
            onLoad={handleImageLoad}
            style={{ display: hasImageLoaded ? 'block' : 'none' }}
          />
        </div>
      )}
    </Draggable>
  )
}

export default DocumentCard;
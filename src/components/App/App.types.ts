export interface Photo {
  id: string;
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  };
}

export interface FetchPhotosResult {
  total: number;
  total_pages: number;
  results: Photo[];
}

export interface ModalImage {
  src: string;
  alt: string;
}
export interface ImageCardProps {
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  };
  handleOpenModal: (modalImg: { src: string; alt: string }) => void;
}
export interface ImageGalleryProps {
  photos: Photo[];
  handleOpenModal: (modalImg: { src: string; alt: string }) => void;
}

export interface ImageModalProps {
  modalImg: {
    src: string;
    alt: string;
  };
  modalIsOpen: boolean;
  closeModal: () => void;
}
export interface LoadMoreBtnProps {
  onClick: () => void;
}

export interface SearchBarProps {
  onSubmit: (searchTerm: string) => void;
}

export interface FormValues {
  search: string;
}

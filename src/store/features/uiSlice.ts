import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  isModalOpen: boolean;
  isShareModalOpen: boolean;
  isPanelOpen: boolean;
  shareUrl: string;
  isSharing: boolean;
}

const initialState: UiState = {
  isModalOpen: false,
  isShareModalOpen: false,
  isPanelOpen: false,
  shareUrl: '',
  isSharing: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setShareModalOpen: (state, action) => {
      state.isShareModalOpen = action.payload;
    },
    setPanelOpen: (state, action) => {
      state.isPanelOpen = action.payload;
    },
    setShareUrl: (state, action) => {
      state.shareUrl = action.payload;
    },
    setIsSharing: (state, action) => {
      state.isSharing = action.payload;
    },
  },
});

export const { setModalOpen, setShareModalOpen, setPanelOpen, setShareUrl, setIsSharing } = uiSlice.actions;
export default uiSlice.reducer;

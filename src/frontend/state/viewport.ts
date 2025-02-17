import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type Viewport } from '@xyflow/react';

interface ViewportState {
    viewport?: Viewport
};

export const viewportSlice = createSlice({
    name: 'viewport',
    initialState: {} as ViewportState,
    reducers: {
        setViewport: (state: ViewportState, action: PayloadAction<Viewport>) => {
            state.viewport = action.payload;
        },
        resetViewport: (state: ViewportState) => {
            state.viewport = undefined;
        }
    }
});

export const { setViewport, resetViewport } = viewportSlice.actions;

export default viewportSlice.reducer;

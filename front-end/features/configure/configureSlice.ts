import {createSlice, createAsyncThunk, current, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { FieldState,Field } from '../../types/configure';
import api from '../../pages/api/configure'


const initialState:FieldState = {
    fields:[]
};

export const getConfigureFileds = createAsyncThunk<FieldState>(
    'configure/getConfigureFileds',
    async function () {
        try {
            let response = await api.get<FieldState>('/configure');
            return response.data as FieldState;
        } catch(err) {
            console.log(err)
        }
});

export const deleteField = createAsyncThunk(
    'configure/deleteConfigureFileds',
    async function (id:string) {
        try {
            await api({method: 'DELETE', url:'/configure/' + id});
            return id;
        } catch(err) {
            console.log(err)
        }
});

export const updateField = createAsyncThunk(
    'configure/updateConfigureFileds',
    async function (changedField:Field) {
        try {
            const response =  await api.put<Field>(`/configure/${changedField.id}`, changedField);
            return response.data;
        } catch(err) {
            console.log(err)
        }
    }
);

export const addNewField= createAsyncThunk(
    'configure/addNewField',
    async function(newField:Field) {
        try {
            const resp = await api.post('/configure', newField);
            return resp.data;
        } catch(err) {
            console.log(err);
        }
    }
);


const handleGetFulfilled = (state, {payload}:PayloadAction<FieldState>) => {
   state.fields = payload;
};

const configureFields = createSlice({
    name: 'configure',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getConfigureFileds.fulfilled, handleGetFulfilled)
        .addCase(deleteField.fulfilled, (state, {payload}:PayloadAction<string>) => {
            state.fields = current(state.fields).filter(item => item.id !== payload)      
        })
        .addCase(updateField.fulfilled, (state, {payload}:PayloadAction<Field>) => {
            const result = [];
            state.fields.forEach((item) => {
                if(item.id === payload.id) {
                    item.type = payload.type;
                    item.label = payload.label;
                    item.required = payload.required;
                    item.visible = payload.visible;
                    if(payload.type === 'Text') {
                        item.rows = payload.rows;
                    } else {
                       delete item.rows;
                    }
                }
                result.push(item);
            }); 
            state.fields = result;
        })
        .addCase(addNewField.fulfilled, (state, {payload}:PayloadAction<Field>) => {
            state.fields = [...current(state.fields), payload];    
        })
    }
});


export const selectFields = (state: RootState) => state.configure.fields;
export default configureFields.reducer;

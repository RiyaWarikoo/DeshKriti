import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async(info,{rejectWithValue, fulfillWithValue}) => {
         console.log(info)
        try {
            const {data} = await api.post('/admin-login',info,{withCredentials: true})
            localStorage.setItem('accessToken',data.token)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async(info,{rejectWithValue, fulfillWithValue}) => {
         console.log(info)
        try {
            const {data} = await api.post('/seller-login',info,{withCredentials: true})
            console.log(data)
            localStorage.setItem('accessToken',data.token) 
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async(_ ,{rejectWithValue, fulfillWithValue}) => {
          
        try {
            const {data} = await api.get('/get-user',{withCredentials: true})
            // console.log(data)            
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
    async(image ,{rejectWithValue, fulfillWithValue}) => {

        try {
            const {data} = await api.post('/profile-image-upload',image,{withCredentials: true})
            // console.log(data)            
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// end method 


export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async(info,{rejectWithValue, fulfillWithValue}) => { 
        try {
            console.log(info)
            const {data} = await api.post('/seller-register',info,{withCredentials: true})
            localStorage.setItem('accessToken',data.token)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
export const profile_info_add = createAsyncThunk(
    'auth/profile_info_add',
    async(info,{rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data} = await api.post('/profile-info-add',info,{withCredentials: true}) 
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// end method 

    const returnRole = (token) => {
        if (token) {
           const decodeToken = jwtDecode(token)
           const expireTime = new Date(decodeToken.exp * 1000)
           if (new Date() > expireTime) {
             localStorage.removeItem('accessToken')
             return ''
           } else {
                return decodeToken.role
           }
            
        } else {
            return ''
        }
    }
    // end Method 
    export const logout = createAsyncThunk('auth/logout', async ({ navigate }, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/logout', { withCredentials: true });
            return data; // Retourne le message de succès du backend
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });
    
        // end Method 

 
export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        userInfo : '',
        role: returnRole(localStorage.getItem('accessToken')),
        token: localStorage.getItem('accessToken')
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""; // Ajout pour réinitialiser le message de succès
        }

    },
    extraReducers: (builder) => {
        builder
        .addCase(admin_login.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(admin_login.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(admin_login.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })

        .addCase(seller_login.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(seller_login.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(seller_login.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })

        .addCase(seller_register.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(seller_register.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(seller_register.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })
        .addCase(get_user_info.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.userInfo = payload.userInfo
        })
        .addCase(profile_image_upload.pending, (state, { payload }) => {
            state.loader = true; 
        })
        .addCase(profile_image_upload.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        })
        .addCase(profile_info_add.pending, (state) => {
            state.loader = true; // Début du chargement
        })
        .addCase(profile_info_add.fulfilled, (state, { payload }) => {
            state.loader = false; // Fin du chargement
            state.successMessage = payload.message; // Stockez le message de succès
            state.userInfo = payload.userInfo; // Mettez à jour userInfo avec les nouvelles informations
        })
        
        .addCase(profile_info_add.rejected, (state) => {
            state.loader = false; // Fin du chargement en cas d'erreur
        })
        .addCase(logout.pending, (state) => {
            state.loader = true;
        })
        .addCase(logout.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error; // Vérifiez si `payload.error` existe
        })
        .addCase(logout.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message; // Message de succès du backend
            // Réinitialisation des valeurs d'état
            state.token = null; // Réinitialise le token
            state.role = ''; // Réinitialise le rôle
            state.userInfo = ''; // Réinitialise les informations de l'utilisateur
        });
        


    }

})
export const {messageClear} = authReducer.actions
export default authReducer.reducer
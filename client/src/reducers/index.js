import authReducer from './auth.reducer'
import userReducer from './user.reducer'
import newsReducer from './newsletter.reducer'
import queryReducer from './query.reducer'
import quoteReducer from './quote.reducer'
import blogReducer from './blog.reducer'
const { combineReducers } = require("redux");

const rootReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    news: newsReducer,
    query: queryReducer,
    quote: quoteReducer,
    blogs: blogReducer 
})

export default rootReducers
import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-simlife';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';
import { IFetchSiteAction, defaultValue } from 'app/shared/model/ScraperSetting/fetch-site-action.model';

export const ACTION_TYPES = {
  SEARCH_FETCHSITEACTIONS: 'fetchSiteAction/SEARCH_FETCHSITEACTIONS',
  FETCH_FETCHSITEACTION_LIST: 'fetchSiteAction/FETCH_FETCHSITEACTION_LIST',
  FETCH_FETCHSITEACTION: 'fetchSiteAction/FETCH_FETCHSITEACTION',
  CREATE_FETCHSITEACTION: 'fetchSiteAction/CREATE_FETCHSITEACTION',
  UPDATE_FETCHSITEACTION: 'fetchSiteAction/UPDATE_FETCHSITEACTION',
  DELETE_FETCHSITEACTION: 'fetchSiteAction/DELETE_FETCHSITEACTION',
  RESET: 'fetchSiteAction/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFetchSiteAction>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FetchSiteActionState = Readonly<typeof initialState>;

// Reducer

export default (state: FetchSiteActionState = initialState, action): FetchSiteActionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_FETCHSITEACTIONS):
    case REQUEST(ACTION_TYPES.FETCH_FETCHSITEACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FETCHSITEACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FETCHSITEACTION):
    case REQUEST(ACTION_TYPES.UPDATE_FETCHSITEACTION):
    case REQUEST(ACTION_TYPES.DELETE_FETCHSITEACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_FETCHSITEACTIONS):
    case FAILURE(ACTION_TYPES.FETCH_FETCHSITEACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FETCHSITEACTION):
    case FAILURE(ACTION_TYPES.CREATE_FETCHSITEACTION):
    case FAILURE(ACTION_TYPES.UPDATE_FETCHSITEACTION):
    case FAILURE(ACTION_TYPES.DELETE_FETCHSITEACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_FETCHSITEACTIONS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FETCHSITEACTION_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FETCHSITEACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FETCHSITEACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_FETCHSITEACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FETCHSITEACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = '/scrapersetting/api/fetch-site-actions';
const apiSearchUrl = '/scrapersetting//api/_search/fetch-site-actions';

// Actions

export const getSearchEntities: ICrudSearchAction<IFetchSiteAction> = query => ({
  type: ACTION_TYPES.SEARCH_FETCHSITEACTIONS,
  payload: axios.get<IFetchSiteAction>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IFetchSiteAction> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FETCHSITEACTION_LIST,
    payload: axios.get<IFetchSiteAction>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IFetchSiteAction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FETCHSITEACTION,
    payload: axios.get<IFetchSiteAction>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFetchSiteAction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FETCHSITEACTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFetchSiteAction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FETCHSITEACTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFetchSiteAction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FETCHSITEACTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

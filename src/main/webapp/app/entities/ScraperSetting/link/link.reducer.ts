import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-simlife';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';
import { ILink, defaultValue } from 'app/shared/model/ScraperSetting/link.model';

export const ACTION_TYPES = {
  SEARCH_LINKS: 'link/SEARCH_LINKS',
  FETCH_LINK_LIST: 'link/FETCH_LINK_LIST',
  FETCH_LINK: 'link/FETCH_LINK',
  CREATE_LINK: 'link/CREATE_LINK',
  UPDATE_LINK: 'link/UPDATE_LINK',
  DELETE_LINK: 'link/DELETE_LINK',
  RESET: 'link/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILink>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LinkState = Readonly<typeof initialState>;

// Reducer

export default (state: LinkState = initialState, action): LinkState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_LINKS):
    case REQUEST(ACTION_TYPES.FETCH_LINK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LINK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LINK):
    case REQUEST(ACTION_TYPES.UPDATE_LINK):
    case REQUEST(ACTION_TYPES.DELETE_LINK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_LINKS):
    case FAILURE(ACTION_TYPES.FETCH_LINK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LINK):
    case FAILURE(ACTION_TYPES.CREATE_LINK):
    case FAILURE(ACTION_TYPES.UPDATE_LINK):
    case FAILURE(ACTION_TYPES.DELETE_LINK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_LINKS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LINK_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LINK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LINK):
    case SUCCESS(ACTION_TYPES.UPDATE_LINK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LINK):
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

const apiUrl = '/scrapersetting/api/links';
const apiSearchUrl = '/scrapersetting//api/_search/links';

// Actions

export const getSearchEntities: ICrudSearchAction<ILink> = query => ({
  type: ACTION_TYPES.SEARCH_LINKS,
  payload: axios.get<ILink>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ILink> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LINK_LIST,
    payload: axios.get<ILink>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ILink> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LINK,
    payload: axios.get<ILink>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILink> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LINK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILink> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LINK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILink> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LINK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

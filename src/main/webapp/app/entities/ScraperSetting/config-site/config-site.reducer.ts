import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-simlife';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';
import { IConfigSite, defaultValue } from 'app/shared/model/ScraperSetting/config-site.model';

export const ACTION_TYPES = {
  SEARCH_CONFIGSITES: 'configSite/SEARCH_CONFIGSITES',
  FETCH_CONFIGSITE_LIST: 'configSite/FETCH_CONFIGSITE_LIST',
  FETCH_CONFIGSITE: 'configSite/FETCH_CONFIGSITE',
  CREATE_CONFIGSITE: 'configSite/CREATE_CONFIGSITE',
  UPDATE_CONFIGSITE: 'configSite/UPDATE_CONFIGSITE',
  DELETE_CONFIGSITE: 'configSite/DELETE_CONFIGSITE',
  RESET: 'configSite/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConfigSite>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ConfigSiteState = Readonly<typeof initialState>;

// Reducer

export default (state: ConfigSiteState = initialState, action): ConfigSiteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CONFIGSITES):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGSITE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGSITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONFIGSITE):
    case REQUEST(ACTION_TYPES.UPDATE_CONFIGSITE):
    case REQUEST(ACTION_TYPES.DELETE_CONFIGSITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CONFIGSITES):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGSITE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGSITE):
    case FAILURE(ACTION_TYPES.CREATE_CONFIGSITE):
    case FAILURE(ACTION_TYPES.UPDATE_CONFIGSITE):
    case FAILURE(ACTION_TYPES.DELETE_CONFIGSITE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CONFIGSITES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGSITE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGSITE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONFIGSITE):
    case SUCCESS(ACTION_TYPES.UPDATE_CONFIGSITE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONFIGSITE):
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

const apiUrl = '/scrapersetting/api/config-sites';
const apiSearchUrl = '/scrapersetting//api/_search/config-sites';

// Actions

export const getSearchEntities: ICrudSearchAction<IConfigSite> = query => ({
  type: ACTION_TYPES.SEARCH_CONFIGSITES,
  payload: axios.get<IConfigSite>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IConfigSite> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CONFIGSITE_LIST,
    payload: axios.get<IConfigSite>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IConfigSite> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONFIGSITE,
    payload: axios.get<IConfigSite>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IConfigSite> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONFIGSITE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConfigSite> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONFIGSITE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConfigSite> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONFIGSITE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

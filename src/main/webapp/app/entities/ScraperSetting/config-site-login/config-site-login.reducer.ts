import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-simlife';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';
import { IConfigSiteLogin, defaultValue } from 'app/shared/model/ScraperSetting/config-site-login.model';

export const ACTION_TYPES = {
  SEARCH_CONFIGSITELOGINS: 'configSiteLogin/SEARCH_CONFIGSITELOGINS',
  FETCH_CONFIGSITELOGIN_LIST: 'configSiteLogin/FETCH_CONFIGSITELOGIN_LIST',
  FETCH_CONFIGSITELOGIN: 'configSiteLogin/FETCH_CONFIGSITELOGIN',
  CREATE_CONFIGSITELOGIN: 'configSiteLogin/CREATE_CONFIGSITELOGIN',
  UPDATE_CONFIGSITELOGIN: 'configSiteLogin/UPDATE_CONFIGSITELOGIN',
  DELETE_CONFIGSITELOGIN: 'configSiteLogin/DELETE_CONFIGSITELOGIN',
  RESET: 'configSiteLogin/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConfigSiteLogin>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ConfigSiteLoginState = Readonly<typeof initialState>;

// Reducer

export default (state: ConfigSiteLoginState = initialState, action): ConfigSiteLoginState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CONFIGSITELOGINS):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGSITELOGIN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGSITELOGIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONFIGSITELOGIN):
    case REQUEST(ACTION_TYPES.UPDATE_CONFIGSITELOGIN):
    case REQUEST(ACTION_TYPES.DELETE_CONFIGSITELOGIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CONFIGSITELOGINS):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGSITELOGIN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGSITELOGIN):
    case FAILURE(ACTION_TYPES.CREATE_CONFIGSITELOGIN):
    case FAILURE(ACTION_TYPES.UPDATE_CONFIGSITELOGIN):
    case FAILURE(ACTION_TYPES.DELETE_CONFIGSITELOGIN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CONFIGSITELOGINS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGSITELOGIN_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGSITELOGIN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONFIGSITELOGIN):
    case SUCCESS(ACTION_TYPES.UPDATE_CONFIGSITELOGIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONFIGSITELOGIN):
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

const apiUrl = '/scrapersetting/api/config-site-logins';
const apiSearchUrl = '/scrapersetting//api/_search/config-site-logins';

// Actions

export const getSearchEntities: ICrudSearchAction<IConfigSiteLogin> = query => ({
  type: ACTION_TYPES.SEARCH_CONFIGSITELOGINS,
  payload: axios.get<IConfigSiteLogin>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IConfigSiteLogin> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CONFIGSITELOGIN_LIST,
    payload: axios.get<IConfigSiteLogin>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IConfigSiteLogin> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONFIGSITELOGIN,
    payload: axios.get<IConfigSiteLogin>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IConfigSiteLogin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONFIGSITELOGIN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConfigSiteLogin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONFIGSITELOGIN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConfigSiteLogin> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONFIGSITELOGIN,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

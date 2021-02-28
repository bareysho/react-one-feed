import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { login } from 'actions/auth';
import { getAuth } from 'selectors/auth';

import './LoginForm.scss';

export const LoginForm = ({ backMethod }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isFetch } = useSelector(getAuth);

  const onSubmit = useCallback((credentials) => { dispatch(login(credentials)); }, [dispatch]);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isFetch}>
            <Field
              name="username"
              render={({ input, meta }) => (
                <div className="form-group">
                  <label htmlFor="username" className="mb-1 text-muted">
                    <small>{t('common.fields.username')}</small>
                  </label>
                  <input
                    {...input}
                    type="text"
                    name="username"
                    id="username"
                    className="form-control rounded-0"
                  />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />
            <Field
              name="password"
              render={({ input, meta }) => (
                <div className="form-group">
                  <label htmlFor="password" className="mb-1 text-muted">
                    <small>{t('common.fields.password')}</small>
                  </label>
                  <input
                    {...input}
                    type="password"
                    name="password"
                    id="password"
                    className="form-control rounded-0"
                  />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />
            <button
              type="submit"
              className="btn btn-brand text-light float-right border-0 rounded-pill"
            >
              {t('common.buttons.login')}
            </button>
            {backMethod
            && (
            <button
              onClick={backMethod}
              type="button"
              className="btn btn-brand-secondary text-white float-right border-0 rounded-pill mx-3"
            >
              {t('common.buttons.back')}
            </button>
            )}
          </fieldset>
        </form>
      )}
    />
  );
};

LoginForm.propTypes = {
  backMethod: PropTypes.func,
};

LoginForm.defaultProps = {
  backMethod: undefined,
};

import {Field, Form, Formik} from "formik";
import React from "react";

const usersSerchFormValidate = (values: any) => {
    const errors = {}
    return errors
}
type UsersSearchFormObjectType = {
    term: string
}
export const UsersSearchForm = () => {

    const submit = (values: UsersSearchFormObjectType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }


    return <div>
        <Formik
            initialValues={{term: ''}}
            validate={usersSerchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}
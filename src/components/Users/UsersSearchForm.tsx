import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";

const usersSerchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type PropsType ={
    onChangeFilter: (filter: FilterType)=>void
}
type FormType = {
    term: string
    friend: "true" | "false" | "null"
}


export const UsersSearchForm: React.FC<PropsType>= (props) => {

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
       const filter: FilterType = {
           term: values.term,
           friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
       }

        props.onChangeFilter(filter);
        setSubmitting(false);
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: 'null' }}
            validate={usersSerchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field as="select" name="friend">
                        <option value= "null" >All</option>
                        <option value="true">Only Folowed</option>
                        <option value="false">Only UnFolowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}
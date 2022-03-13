import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selector";

const usersSerchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type PropsType ={
    onChangeFilter: (filter: FilterType)=>void
}
type FriendType = "true" | "false" | "null";
type FormType = {
    term: string
    friend: FriendType
}



export const UsersSearchForm: React.FC<PropsType>= (props) => {
const filter = useSelector(getUsersFilter)
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
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendType }}
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
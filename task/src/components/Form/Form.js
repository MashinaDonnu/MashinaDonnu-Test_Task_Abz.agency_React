import React, {useState, useRef, useEffect, useCallback, useContext} from 'react'
import './Form.scss'
import {useFetch} from "../../hooks/useFetch"
import {Loader} from "../Loader/Loader"
import {UserContext} from "../../context/user/userContext"
import {ADD_USER} from "../../context/user/actionTypes"
import {ModalContext} from "../../context/modal/ModalContext"

const controlsObject = {
    name: {
        value: '',
        errorMessage: 'Enter correct name!',
        valid: false,
        touched:false
    },
    email: {
        value: '',
        errorMessage: 'Email is not correct!',
        valid: false,
        touched:false
    },
    phone: {
        value: '',
        errorMessage: 'Please, enter correct phone number',
        valid: false,
        touched:false
    },
    position: {
        value: '',
        errorMessage: 'Please, select position',
        valid: false,
        touched:false
    },
    position_id: {
        value: '',
        valid: false
    },
    photo: {
        value: '',
        errorMessage: 'Please, select photo',
        valid: false,
        touched:false
    }
}

export const Form = () => {
    const {show} = useContext(ModalContext)
    const fileRef = useRef()
    const [radioBtns, setRadioBtns] = useState([])
    const {dispatch} = useContext(UserContext)
    const {request, loading} = useFetch()
    const [controls, setControls] = useState(controlsObject)
    const fetchRadioBtns = useCallback(async () => {
        const data = await request('https://frontend-test-assignment-api.abz.agency/api/v1/positions', 'GET')
        setRadioBtns(data.positions)
    }, [request])

    useEffect(() => {
        fetchRadioBtns()
    }, [fetchRadioBtns])

    const renderRadioBtns = () => {
        return radioBtns.map(btn => {
            return (
                <div className="form-check" key={btn.id}>
                    <label className="form-check-label">
                        <input onChange={event => radioOnChangeHandler(event)} type="radio" className="form-check-input" name="optradio" data-id={btn.id} value={btn.name} /><span>{btn.name}</span>
                    </label>
                </div>
            )
        })
    }

    const radioOnChangeHandler = event => {
        const value = event.target.value
        const id = event.target.dataset.id
        setControls({
            ...controls,
            position: {...controls.position, value, valid: true},
            position_id: {value: id, valid: true}
        })
    }
    const fileOnChangeHandler = event => {
        event.preventDefault()
        const value = fileRef.current.files[0]
        event.target.parentNode.children[1].textContent = value.name
        setControls({...controls, photo: {...controls.photo, value, valid: true}})
    }
    const validators = {
        name(name) {
            return name !== '' && (name.length >= 2 && name.length <= 60)
        },
        email(email)
        {
            const re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
            return re.test(email)
        },
        phone(phone) {
            const re = /^[\+]{0,1}380([0-9]{9})$/
            return re.test(phone)
        }
    }


    const validationHandler = event => {
        const inputType = event.target.getAttribute('id')
        const value = event.target.value
        const input = controls[inputType]
        input.touched = true
        const valid = validators[inputType](value)
        setControls({...controls, [inputType]: {...input, value, valid}})
    }

    const isValidInput = type => {
        return !controls[type].valid && controls[type].touched
    }

    const submitHandler = async event => {
        let isErr = false
        event.preventDefault()
        const formData = new FormData()
        const data = controls
        Object.keys(data).forEach(name => {
            if (!controls[name].valid) {
                data[name].touched = true
                isErr = true
                return
            }
            formData.set(name, controls[name].value)
        })
        if (isErr) {
            setControls({...data})
            return
        }

        const token = await request('https://frontend-test-assignment-api.abz.agency/api/v1/token', 'GET')
        const response = await request('https://frontend-test-assignment-api.abz.agency/api/v1/users', 'POST', formData, {'Token': token.token})
        const userId  = response.user_id
        const newUser = await request(`https://frontend-test-assignment-api.abz.agency/api/v1/users/${userId}`)
        if (newUser.success) {
            dispatch({type: ADD_USER, payload: newUser.user})
            show('You have successfully passed the registration')
            setControls(controlsObject)
        } else {
            show(newUser.message)
        }
    }

    return (
        <form className="register-form" encType='multipart/form-data' onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input onChange={validationHandler} placeholder="Your name" type="text" className={`form-control ${isValidInput('name') ? 'err-input' : ''}`} id="name" value={controls.name.value}/>
                <small className="err-mess err">{isValidInput('name') ? controls.name.errorMessage : ''}</small>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input  onChange={validationHandler} placeholder="Your email" type="email" className={`form-control ${isValidInput('email') ? 'err-input' : ''}`} id="email" value={controls.email.value}/>
                <small className="err-mess err" >{isValidInput('email')? controls.email.errorMessage : ''}</small>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input  onChange={validationHandler} type="text" placeholder="+380 XX XXX XX XX" className={`form-control ${isValidInput('phone') ? 'err-input' : ''}`} id="phone" aria-describedby="phoneHelp" value={controls.phone.value}/>
                <small id="phoneHelp" className={`err-mess ${isValidInput('phone') ? 'err' : ''}`}>{isValidInput('phone') ? controls.phone.errorMessage : 'Enter phone number in open format'}</small>
            </div>
            <p className="radio-group-head mt-4">Select your position</p>
            <div className="form-group">
                {loading ? <Loader/> : renderRadioBtns()}
            <div>
                <small id="phoneHelp" className="err-mess err">{isValidInput('position') ? controls.position.errorMessage : ''}</small>
            </div>
            </div>

            <p className="radio-group-head photo" style={{marginBottom:10}}>Photo</p>
            <div className="input-group form-group">
                <div className="custom-file">
                    <input ref={fileRef} onChange={event => fileOnChangeHandler(event)}  type="file" className="custom-file-input" id="inputGroupFile01"
                           aria-describedby="inputGroupFileAddon01" />
                        <label className="custom-file-label" htmlFor="inputGroupFile01">Upload your photo</label>
                </div>
            </div>
                <div>
                    <small id="phoneHelp" className="err-mess err" style={{height: '19px'}}>{isValidInput('photo') ? controls.photo.errorMessage : ''}</small>
                </div>
            <button type="submit" className="form-sing-up btn">Sing up now</button>
        </form>
    )
}

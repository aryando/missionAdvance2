import PropTypes from "prop-types";

export default function FormSelect({ id, label, options = [], register, errors }) {
    return (
        <div className="form">
            <label htmlFor={id}>
                {label} <span className="red-star">*</span>
            </label>
            <select id={id} {...register(id, { required: true })}>
                {options.map((opt) =>
                <option key={opt} value={opt}>{opt}</option>
                )}
            </select>
            {errors[id] && <p className="error">{errors[id].message}</p>}
        </div>
    )
}

FormSelect.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}
export const FileInput = ({ onChange, ...rest }) => (
  <div>
    <input
      id="file"
      type="file"
      accept="image/*"
      onChange={onChange}
      {...rest}
    />
    <label htmlFor="file">
      <span>
        Drag & Drop or <u>Browse</u>
      </span>
    </label>
    <style jsx>{`
      input {
        border: 0px;
        clip: rect(0px, 0px, 0px, 0px);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0px;
        position: absolute;
        width: 1px;
        white-space: nowrap;
        overflow-wrap: normal;
      }

      input + label {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        color: black;
        font-size: 17px;
        padding: 10px 22px;
        text-align: center;
        font-weight: 600;
        border-radius: 99999px;
        width: 220px;
        background-color: white;
        border: none;
        appearance: none;
      }

      input:focus + label {
        outline: none;
        box-shadow: 0 0 0 3px rgba(131, 192, 253, 0.5);
      }
    `}</style>
  </div>
);

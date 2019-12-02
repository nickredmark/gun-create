import React, { useRef } from "react";
import { getUUID } from "nicks-gun-utils";

export const NewGunResource = ({ Gun, gun, next }) => {
  const newId = useRef(null);
  const protectWrite = useRef(null);
  const protectRead = useRef(null);

  return (
    <div className="new">
      <form
        onSubmit={e => {
          e.preventDefault();
          if (newId.current.value) {
            window.location.href = `${next}?id=${newId.current.value}`;
          }
        }}
      >
        <input ref={newId} placeholder="(new) id, e.g. helloworld" />
      </form>
      or
      <form
        onSubmit={async e => {
          e.preventDefault();
          if (!protectWrite.current.checked) {
            window.location.href = `${next}?id=${getUUID(gun)}`;
            return;
          }

          const pair = await SEA.pair();
          let hash = `#priv=${pair.priv}`;
          if (protectRead.current.checked) {
            hash += `&epriv=${pair.epriv}`;
          }
          window.location.href = `${next}?id=~${pair.pub}${hash}`;
        }}
      >
        <div>
          <label>
            Protect write{" "}
            <input
              type="checkbox"
              defaultChecked
              ref={protectWrite}
              onChange={e => {
                if (!e.target.checked) {
                  protectRead.current.checked = false;
                }
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Protect read{" "}
            <input
              type="checkbox"
              ref={protectRead}
              onChange={e => {
                if (e.target.checked) {
                  protectWrite.current.checked = true;
                }
              }}
            />
          </label>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

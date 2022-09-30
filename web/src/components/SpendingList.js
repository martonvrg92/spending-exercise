import React, { useState, useEffect } from "react";
import { FiDollarSign, FiEdit2, FiXOctagon } from "react-icons/fi";
import { DateTime } from "luxon";
import Loader from "./Loader";
import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
} from "../styles/ComponentStyles";
import EditForm from "./EditForm";

export default function SpendingList({ spendings, setSpendings, curr, ordering }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const del = async (val) => {
    await fetch(`/api/spending-delete/${val}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    window.location.reload()
  }


  useEffect(() => {
    setLoading(true);
    fetch(`/api/spendings-list/?search=${curr}&ordering=${ordering}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          setSpendings(response.body);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [curr, ordering]);

  if (loading) return <Loader />;

  return (
    <>
      {error && (
        <ErrorMessage>
          The server is probably down. Please try again later.
        </ErrorMessage>
      )}
      {!spendings.length && !error && (
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
          Yay!{" "}
          <span role="img" aria-label="jsx-a11y/accessible-emoji">
            🎉
          </span>{" "}
          No spendings!
        </h1>
      )}
      {spendings.length > 0 &&
        spendings.map((spending) => (
          <Spending key={spending.id}>
            {showEdit && <EditForm data={spending} />}
            <IconWrapper>
              <FiDollarSign color="var(--color-blue)" />
            </IconWrapper>
            <TextWrapper>
              <h3>{spending.description}</h3>
              <p>
                {DateTime.fromISO(spending.spent_at).toFormat(
                  "t - MMMM dd, yyyy"
                )}
              </p>
            </TextWrapper>
            <AmountWrapper>
              <Amount currency={spending.currency}>
                {(spending.amount).toFixed(2)}
              </Amount>
            </AmountWrapper>
            <IconWrapper>
              <button onClick={() => setShowEdit(true)}>
                <FiEdit2/>
              </button>
            </IconWrapper>
            <IconWrapper>
              <button onClick={(e) => del(e.target.id)}>
                <FiXOctagon id={spending.id} />
              </button>
            </IconWrapper>
          </Spending>
        ))}
    </>
  );
}

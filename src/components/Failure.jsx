import React from "react";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FileSaver from "file-saver";

import WriteButton from "./WriteButton";
import { withAppContext } from "./AppContext";

const TweetButton = ({ words }) => {
  const href = `https://twitter.com/intent/tweet?text=I+wrote+${words}+words+using+The+Slightly+Less+Dangerous+Writing+App+-+until+it+deleted+everything+.+%23SLDWA&url=https%3A%2F%2Ftodoingme-glitch.github.io%2Fthemostdangerouswritingapp%2F`;
  const label = `I wrote ${words} words using The Slightly Less Dangerous Writing App - until it deleted everything.`;
  return (
    <a className="tweet" href={href}>
      {label}
    </a>
  );
};

const FailureActions = ({ text, words }) => {
  const hasText = text && text.trim().length > 0;

  const downloadTxt = () => {
    const blob = new Blob([text.replace(/([^\r])\n/g, "$1\r\n")], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, `MDWA-failed-${words}words.txt`);
  };

  const copyToClipboard = () => {
    navigator.clipboard && navigator.clipboard.writeText(text);
  };

  if (!hasText) return null;

  return (
    <div className="failure-actions">
      <button className="failure-action-btn" onClick={copyToClipboard}>
        Copy to Clipboard
      </button>
      <button className="failure-action-btn" onClick={downloadTxt}>
        Download .txt
      </button>
    </div>
  );
};

const Failure = ({ limit, type, lost, words, text }) => {
  return (
    <TransitionGroup>
      {lost && (
        <CSSTransition classNames="failure" timeout={{ enter: 500, exit: 100 }}>
          <div className="failure" key="failScreen">
            <Link to="/help" className="navButton helpButton white">
              Help
            </Link>
            <div className="inner">
              <h3>You failed.</h3>
              <TweetButton words={words} />
              <FailureActions text={text} words={words} />
              <WriteButton
                ghost
                noPanel
                color="white"
                label="Try
            Again."
                type={type}
                limit={limit}
              />
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export default withAppContext(Failure);

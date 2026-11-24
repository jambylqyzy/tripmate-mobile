
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Minus } from "lucide-react";
import "../styles/FAQ.css";

const faqData = [1, 2, 3, 4, 5, 6];

function FAQ() {
  const { t } = useTranslation();
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setActiveQuestion((previous) =>
      previous === id ? null : id
    );
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">
          {t("aboutPage.faq.title")}
        </h2>

        <div className="faq-list">
          {faqData.map((id, index) => {
            const isOpen = activeQuestion === id;

            return (
              <div
                className={`faq-item ${
                  isOpen ? "faq-item-open" : ""
                }`}
                key={id}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleQuestion(id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${id}`}
                >
                  <span className="faq-question-text">
                    Q{index + 1}.{" "}
                    {t(`aboutPage.faq.items.${id}.question`)}
                  </span>

                  <span className="faq-icon">
                    {isOpen ? (
                      <Minus size={20} strokeWidth={2} />
                    ) : (
                      <Plus size={20} strokeWidth={2} />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${id}`}
                    className="faq-answer"
                  >
                    <p>
                      {t(`aboutPage.faq.items.${id}.answer`)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;

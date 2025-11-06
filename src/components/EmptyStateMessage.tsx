import { BORDER_COLOR, TEXT_PRIMARY } from "@/styles/colors";
import { css } from "@linaria/atomic";

const emptyStateStyles = css`
  margin-top: 2rem;
  text-align: center;
  padding: 1rem;
  background-color: white;
  border: 1px solid ${BORDER_COLOR};
  border-radius: 0.5rem;
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${TEXT_PRIMARY};
    margin-bottom: 0.5rem;
  }
  p {
    color: #64748b;
    margin-bottom: 1.5rem;
  }
`;

const EmptyStateMessage = ({ title, message }: { title: string; message: string }) => (
  <div className={emptyStateStyles}>
    <h3>{title}</h3>
    <p>{message}</p>
  </div>
);


export default EmptyStateMessage
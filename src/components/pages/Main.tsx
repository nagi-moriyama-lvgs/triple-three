import React from "react";
import styled from "styled-components";

type BaseRegisterOfficeProps = {
  className?: string;
};

const BaseRegisterOffice: React.FC<BaseRegisterOfficeProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <h2>hello world</h2>
    </div>
  );
};

const RegisterOffice = styled(BaseRegisterOffice)`
  & {
  }
`;

export default RegisterOffice;

import React from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

type Props = {
  expression: string | undefined;
};

export default function LatexExpression({ expression }: Props) {
  return <BlockMath math={expression!} />;
}

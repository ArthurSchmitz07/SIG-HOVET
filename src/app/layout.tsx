import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "SIG-HOVET | Requisições",
  description: "Desafio universitário: requisições de uma consulta veterinária.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>
        <AntdRegistry>
  <Providers>{children}</Providers>
</AntdRegistry>
      </body>
    </html>
  );
}

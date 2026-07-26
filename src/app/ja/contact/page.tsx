"use client";

import { FormEvent, useState } from "react";
import Header from "../../../components/Header";
import { company } from "../../../config/company";

const products = ["アルミニウム", "銅", "亜鉛", "その他"];

const contactAdvantages = [
  {
    title: "安定した供給",
    description:
      "お客様の仕様および取引条件に基づき、専門的に調達します。",
  },
  {
    title: "柔軟な取引対応",
    description:
      "各取引条件に応じて、FOB・CFR・CIFに柔軟に対応します。",
  },
  {
    title: "国際取引の経験",
    description:
      "契約、貿易書類、決済、国際物流を実務面から支援します。",
  },
  {
    title: "迅速な対応",
    description:
      "通常、営業日1日以内にお問い合わせ内容を確認します。",
  },
];

export default function お問い合わせPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProduct = (product: string) => {
    setSelectedProducts((current) =>
      current.includes(product)
        ? current.filter((item) => item !== product)
        : [...current, product]
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") ?? "");
    const companyName = String(form.get("company") ?? "");
    const country = String(form.get("country") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const quantity = String(form.get("quantity") ?? "");
    const tradeTerm = String(form.get("tradeTerm") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = `Trading Inquiry from ${companyName || name}`;

    const body = [
      "Trading Inquiry",
      "",
      `Name: ${name}`,
      `Company: ${companyName}`,
      `Country: ${country}`,
      `Email: ${email}`,
      `電話 / WhatsApp: ${phone || "Not provided"}`,
      `対象商品: ${
        selectedProducts.length > 0
          ? selectedProducts.join(", ")
          : "Not specified"
      }`,
      `予定数量: ${quantity || "Not specified"}`,
      `希望取引条件: ${tradeTerm || "Not specified"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Introduction */}
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              お問い合わせ
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
              まずはご相談ください
            </h1>

            <p className="mt-6 text-[17px] leading-8 text-[var(--text-light)]">
              信頼できる供給先をお探しの場合、新しい材料の調達、長期的な協力をご検討の場合は、お気軽にお問い合わせください。通常、営業日1日以内にご返信します。
          
             </p>
          </div>
        </section>

        {/* Inquiry form and company information */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Inquiry form */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                お問い合わせフォーム
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                ご要望をお聞かせください
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-[var(--text-light)]">
                材料、数量、仕向地、ご希望の取引条件について、分かる範囲でご入力ください。
              </p>

              <form onSubmit={handleSubmit} className="mt-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      お名前 *
                    </span>

                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      会社名 *
                    </span>

                    <input
                      type="text"
                      name="company"
                      required
                      autoComplete="organization"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      国・地域 *
                    </span>

                    <input
                      type="text"
                      name="country"
                      required
                      autoComplete="country-name"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      Email *
                    </span>

                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      電話 / WhatsApp
                    </span>

                    <input
                      type="text"
                      name="phone"
                      autoComplete="tel"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      予定数量
                    </span>

                    <input
                      type="text"
                      name="quantity"
                      placeholder="例：100 MT"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary-dark)]"
                    />
                  </label>
                </div>

                {/* Products */}
                <fieldset className="mt-8">
                  <legend className="text-sm font-semibold text-[var(--text)]">
                    対象商品
                  </legend>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => {
                      const selected = selectedProducts.includes(product);

                      return (
                        <label
                          key={product}
                          className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition ${
                            selected
                              ? "border-[var(--primary-dark)] bg-[var(--background)] text-[var(--text)]"
                              : "border-[var(--border)] bg-white text-[var(--text-light)] hover:border-[var(--primary-dark)]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleProduct(product)}
                            className="h-4 w-4 accent-[var(--primary-dark)]"
                          />

                          <span>{product}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <label className="mt-8 block">
                  <span className="text-sm font-semibold text-[var(--text)]">
                    希望取引条件
                  </span>

                  <select
                    name="tradeTerm"
                    defaultValue=""
                    className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                  >
                    <option value="">選択してください</option>
                    <option value="FOB">FOB</option>
                    <option value="CFR">CFR</option>
                    <option value="CIF">CIF</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label className="mt-8 block">
                  <span className="text-sm font-semibold text-[var(--text)]">
                    お問い合わせ内容 *
                  </span>

                  <textarea
                    name="message"
                    required
                    rows={7}
                    placeholder="仕様、原産地または仕向地、梱包、その他のご要望をご記入ください。"
                    className="mt-3 w-full resize-y border border-[var(--border)] bg-white px-4 py-3 text-[15px] leading-7 text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary-dark)]"
                  />
                </label>

                <div className="mt-8 flex flex-col gap-4 sm:items-end">
  <button
    type="submit"
    className="btn-primary rounded-sm px-6 py-3 font-semibold"
  >
    送信する
  </button>

  <p className="text-sm leading-6 text-[var(--text-light)] sm:text-right">
    ボタンを押すと、お問い合わせ内容が入力された状態で既定のメールアプリが開きます。
  </p>
</div>
              </form>
            </div>

            {/* Company information */}
            <aside className="lg:border-l lg:border-[var(--border)] lg:pl-12">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                会社情報
              </p>

              <h2 className="mt-5 text-2xl font-semibold leading-snug text-[var(--text)]">
                騰騏資源株式会社
              </h2>

              <div className="mt-10 space-y-9">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
                    所在地
                  </p>

                  <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                    大阪 | 日本
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
                    Email
                  </p>

                  <a
                    href={`mailto:${company.email}`}
                    className="mt-3 block break-all text-[16px] font-semibold text-[var(--text)] transition hover:text-[var(--primary-dark)]"
                  >
                    {company.email}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
                    事業内容
                  </p>

                  <ul className="mt-3 space-y-2 text-[16px] leading-7 text-[var(--text-light)]">
                    <li>金属資源</li>
                    <li>産業材料</li>
                    <li>国際貿易</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
                    営業時間
                  </p>

                  <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                    月曜日～金曜日
                    <br />
                    09:00 – 18:00 JST
                  </p>
                </div>
              </div>

              <div className="mt-12 border-t border-[var(--border)] pt-8">
                <p className="text-[16px] leading-7 text-[var(--text-light)]">
                  世界各地のメーカー、リサイクラー、商社、販売会社からのお問い合わせを歓迎しています。
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Why work with us */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              当社が選ばれる理由
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              専門的な国際取引サポート
            </h2>

            <div className="mt-12 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4">
              {contactAdvantages.map((advantage) => (
                <article
                  key={advantage.title}
                  className="min-h-[230px] bg-white p-7"
                >
                  <div className="h-2 w-2 rounded-full bg-[var(--primary-dark)]" />

                  <h3 className="mt-7 text-xl font-semibold text-[var(--text)]">
                    {advantage.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-7 text-[var(--text-light)]">
                    {advantage.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final call to action */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--text)]">
                信頼できる取引パートナーをお探しですか？
              </h2>

              <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                材料および国際取引に関するご要望をお聞かせください。
              </p>
            </div>

            <a
              href={`mailto:${company.email}?subject=Trading Inquiry`}
              className="btn-primary shrink-0 rounded-sm px-7 py-3 font-medium"
            >
              メールで問い合わせる
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
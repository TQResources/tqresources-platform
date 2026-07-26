"use client";

import { FormEvent, useState } from "react";
import Header from "../../../components/Header";
import { company } from "../../../config/company";

const products = ["铝", "铜", "锌", "其他"];

const contactAdvantages = [
  {
    title: "稳定供应",
    description:
      "根据客户规格和交易要求，提供专业采购服务。",
  },
  {
    title: "灵活贸易",
    description:
      "根据每笔交易的具体情况，灵活安排FOB、CFR和CIF条款。",
  },
  {
    title: "国际贸易经验",
    description:
      "为合同、贸易单据、付款和国际物流提供实际支持。",
  },
  {
    title: "快速响应",
    description:
      "通常会在一个工作日内确认并处理业务咨询。",
  },
];

export default function 联系我们Page() {
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
      `电话 / WhatsApp: ${phone || "Not provided"}`,
      `感兴趣的产品: ${
        selectedProducts.length > 0
          ? selectedProducts.join(", ")
          : "Not specified"
      }`,
      `预计数量: ${quantity || "Not specified"}`,
      `希望的贸易条款: ${tradeTerm || "Not specified"}`,
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
              联系我们
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
              开始沟通
            </h1>

            <p className="mt-6 text-[17px] leading-8 text-[var(--text-light)]">
              无论您正在寻找可靠供应商、采购新材料或探讨长期合作，我们都欢迎您的询盘。通常会在一个工作日内回复。
          
             </p>
          </div>
        </section>

        {/* Inquiry form and company information */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Inquiry form */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                询盘表单
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                请告诉我们您的需求
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-[var(--text-light)]">
                请尽量提供材料、数量、目的地及希望采用的贸易条款等信息。
              </p>

              <form onSubmit={handleSubmit} className="mt-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      姓名 *
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
                      公司名称 *
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
                      国家或地区 *
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
                      电话 / WhatsApp
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
                      预计数量
                    </span>

                    <input
                      type="text"
                      name="quantity"
                      placeholder="例如：100 MT"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary-dark)]"
                    />
                  </label>
                </div>

                {/* Products */}
                <fieldset className="mt-8">
                  <legend className="text-sm font-semibold text-[var(--text)]">
                    感兴趣的产品
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
                    希望的贸易条款
                  </span>

                  <select
                    name="tradeTerm"
                    defaultValue=""
                    className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                  >
                    <option value="">请选择</option>
                    <option value="FOB">FOB</option>
                    <option value="CFR">CFR</option>
                    <option value="CIF">CIF</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label className="mt-8 block">
                  <span className="text-sm font-semibold text-[var(--text)]">
                    询盘内容 *
                  </span>

                  <textarea
                    name="message"
                    required
                    rows={7}
                    placeholder="请填写规格、产地或目的地、包装及其他相关要求。"
                    className="mt-3 w-full resize-y border border-[var(--border)] bg-white px-4 py-3 text-[15px] leading-7 text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary-dark)]"
                  />
                </label>

                <div className="mt-8 flex flex-col gap-4 sm:items-end">
  <button
    type="submit"
    className="btn-primary rounded-sm px-6 py-3 font-semibold"
  >
    发送询盘
  </button>

  <p className="text-sm leading-6 text-[var(--text-light)] sm:text-right">
    点击按钮后，将打开默认邮件程序，并自动填入询盘内容。
  </p>
</div>
              </form>
            </div>

            {/* Company information */}
            <aside className="lg:border-l lg:border-[var(--border)] lg:pl-12">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                公司信息
              </p>

              <h2 className="mt-5 text-2xl font-semibold leading-snug text-[var(--text)]">
                腾骐资源有限公司
              </h2>

              <div className="mt-10 space-y-9">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
                    所在地
                  </p>

                  <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                    日本 | 大阪
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
                    业务范围
                  </p>

                  <ul className="mt-3 space-y-2 text-[16px] leading-7 text-[var(--text-light)]">
                    <li>金属资源</li>
                    <li>工业材料</li>
                    <li>国际贸易</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
                    营业时间
                  </p>

                  <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                    星期一至星期五
                    <br />
                    09:00 – 18:00 JST
                  </p>
                </div>
              </div>

              <div className="mt-12 border-t border-[var(--border)] pt-8">
                <p className="text-[16px] leading-7 text-[var(--text-light)]">
                  欢迎全球制造商、回收企业、贸易商和经销商与我们联系。
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Why work with us */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              选择我们的理由
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              专业的国际贸易支持
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
                正在寻找可靠的贸易伙伴？
              </h2>

              <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                欢迎与我们洽谈材料及国际贸易需求。
              </p>
            </div>

            <a
              href={`mailto:${company.email}?subject=Trading Inquiry`}
              className="btn-primary shrink-0 rounded-sm px-7 py-3 font-medium"
            >
              发送邮件
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
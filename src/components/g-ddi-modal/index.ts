import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import ddiCountries, { Country } from "./mock";

import closeIcon from "../../icons/close-icon";

@customElement("g-ddi-modal")
export class GDdiModal extends LitElement {
  @state() private _search: string = "";
  @state() private _countries: Country[] = [...ddiCountries];
  @state() private _isModalOpen: boolean = true;
  @property() activeCountry: Country = {
    ddi: "+55",
    name: "Brasil",
    abbreviation: "BR",
  };
  @property() _currentFlagActive: string =
    "https://bbtekixf-media-cms-site-production.s3.sa-east-1.amazonaws.com/flags/" +
    this.activeCountry.abbreviation +
    ".svg";
  @property() buttonStyles: string = "";

  openModal() {
    this._isModalOpen = true;
  }

  closeModal() {
    this._isModalOpen = false;
  }

  private _filterCountries(newValue: string) {
    const filterItems = ddiCountries.filter((item) =>
      item.name.toLowerCase().includes(newValue.toLowerCase())
    );

    this._countries = [...filterItems];
  }

  private _handleInputSearch(e: any) {
    this._search = e.target.value;

    this._filterCountries(this._search);
  }

  private _setCountry(country: Country) {
    this.activeCountry = { ...country };
    this._currentFlagActive =
      "https://bbtekixf-media-cms-site-production.s3.sa-east-1.amazonaws.com/flags/" +
      country.abbreviation +
      ".svg";

    this.closeModal();
  }

  render() {
    return html`
      <button
        class="ddi-modal__trigger"
        style=${this.buttonStyles}
        @click=${this.openModal}
      >
        <img
          src=${this._currentFlagActive}
          alt=${`Bandeira ${this.activeCountry.name}`}
        />

        <span class="ddi-modal__arrow"></span>
      </button>

      <div class="ddi-overflow">
        <div class="ddi-modal ${this._isModalOpen ? "show" : ""}" ddi-modal>
          <h3 class="ddi-modal__title">
            Selecione o código de área
            <button class="ddi-modal__close-button" @click=${this.closeModal}>
              ${closeIcon}
            </button>
          </h3>

          <input
            class="ddi-modal__input"
            type="search"
            placeholder="Buscar"
            value=${this._search}
            @keyup=${this._handleInputSearch}
          />

          <ul class="ddi-modal__list">
            ${this._countries.map(
              (country) =>
                html`
                  <li
                    class="ddi-modal__item"
                    @click=${() => this._setCountry(country)}
                  >
                    <img
                      class="ddi-modal__flag"
                      src=${"https://bbtekixf-media-cms-site-production.s3.sa-east-1.amazonaws.com/flags/" +
                      country.abbreviation +
                      ".svg"}
                      loading="lazy"
                    />
                    ${country.abbreviation} - ${country.name}

                    <span>${country.ddi}</span>
                  </li>
                `
            )}
          </ul>
        </div>
      </div>
    `;
  }

  static styles = css`
    button {
      cursor: pointer;
    }

    .ddi-modal {
      position: fixed;
      inset: 0;
      left: 0px;
      background: #fff;
      z-index: 2;
      margin-top: 20vh;
      border-radius: 16px 16px 0 0;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      overflow: scroll;

      display: grid;
      grid-template-rows: auto auto 1fr;
      gap: 20px;
      transform: translateY(110%) translateX(0%);
      transition: transform var(--time-animation) ease;
    }

    @media (min-width: 768px) {
      .ddi-modal {
        inset: initial;
        border-radius: 16px;
        opacity: 0;
        margin: 0;
        transition: opacity var(--time-animation) ease;
        max-height: 50vh;
        max-width: 400px;
        inset: 0;
        margin: auto;
        transform: translateY(0%);
      }
    }

    .ddi-modal.show {
      transform: translateY(0%);
    }

    @media (min-width: 768px) {
      .ddi-modal.show {
        transform: translateY(0%);
        opacity: 1;
      }
    }

    .ddi-modal__trigger {
      display: inline-block;
      height: 20px;
      padding: 0px 0px 0px 0px;
      margin: 0px 0px 0px 0px;
      background-color: transparent;
      border: none;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .ddi-modal__arrow {
      display: inline-block;
      border: 1px solid #000;
      border-top: 0px;
      border-left: 0px;
      transform: rotate(45deg);

      margin-top: -1px;
      width: 4px;
      height: 4px;
    }

    .ddi-modal__title {
      margin: 0px;
      text-align: left;
      font-family: Outfit, sans-serif, Arial, Helvetica;
      font-size: 16px;
      font-weight: bold;
      color: #000;
      padding: 24px 24px 0px;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .ddi-modal__close-button {
      background-color: transparent;
      padding: 0px 0px 0px 0px;
      border: 0px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      width: 24px;
      height: 24px;
    }

    .ddi-modal__input {
      padding: 0px 10px;
      border-radius: 4px;
      height: 40px;
      background-color: transparent;
      border: 1px solid rgb(204, 204, 204);
      margin: 0px 24px;
      color: #000;
    }

    .ddi-modal__list {
      padding: 0px 0px 20px;
      margin: 0px;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }

    .ddi-modal__item {
      font-size: 14px;
      font-family: Outfit, sans-serif, Arial, Helvetica;
      font-weight: 400;
      padding: 14px 24px;

      color: #000;

      display: grid;
      align-items: center;
      grid-template-columns: auto 1fr auto;
      gap: 14px;

      cursor: pointer;
    }

    .ddi-modal__item:hover {
      background: rgba(13, 29, 150, 0.11);
    }

    .ddi-modal__item div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .ddi-modal__flag {
      background: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      object-fit: cover;
      object-position: center center;

      display: inline-block;
      width: 32px;
      height: 32px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "g-ddi-modal": GDdiModal;
  }
}

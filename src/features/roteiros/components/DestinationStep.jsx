import LegacyIcon from "../../../components/common/LegacyIcon";
import { cities, destinationSuggestions, roteiroThemes, states } from "../data/roteiroData";
import StepHeader from "./StepHeader";

export default function DestinationStep({ form, update, themeKey, availableCities = [] }) {
  const selectedState = states.find((state) => state.code === form.state);

  return (
    <section className="lsec w" id="destino">
      <div className="wrap">
        <StepHeader
          icon="pin"
          badge="Destino"
          lead="Clique em um estado no mapa e escolha uma das cidades, selecione um destino com locais já aprovados ou escreva seu destino."
        >
          Para onde <em className="hl">vamos?</em>
        </StepHeader>

        {availableCities.length > 0 && (
          <div className="sugs rv">
            <span>Destinos com locais reais cadastrados:</span>
            {availableCities.map(({ label, count }) => {
              const cityName = label.split(" - ")[0];
              return (
                <button
                  className="cp"
                  type="button"
                  key={label}
                  onClick={() => update({ destination: cityName })}
                  aria-pressed={form.destination.toLowerCase() === cityName.toLowerCase()}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>
        )}

        {themeKey !== "neutro" ? (
          <div className="sugs rv">
            <span>Sugestões para {roteiroThemes[themeKey].label.toLowerCase()}:</span>
            {destinationSuggestions[themeKey].map((destination) => (
              <button
                className="cp"
                type="button"
                key={destination}
                onClick={() => update({ destination })}
                aria-pressed={form.destination === destination}
              >
                {destination}
              </button>
            ))}
          </div>
        ) : null}

        <div className="brm rv">
          <div className="tmap" role="group" aria-label="Mapa do Brasil por estados">
            {states.map((state) => (
              <button
                className="tl"
                type="button"
                key={state.code}
                title={state.name}
                aria-label={state.name}
                aria-pressed={form.state === state.code}
                onClick={() => update({ state: state.code, destination: "" })}
                style={{ gridColumn: state.column + 1, gridRow: state.row + 1 }}
              >
                {state.code}
              </button>
            ))}
          </div>

          <div className="cpanel">
            {selectedState ? (
              <>
                <div className="cph">
                  <LegacyIcon name="map" />
                  <b>{selectedState.name}</b>
                  <small>Escolha uma cidade</small>
                </div>
                <div className="ctys">
                  {cities[selectedState.code].map((city, index) => {
                    const destination = `${city} – ${selectedState.code}`;
                    return (
                      <button
                        className="cty"
                        type="button"
                        key={city}
                        onClick={() => update({ destination })}
                        aria-pressed={form.destination === destination}
                        style={{ "--i": index }}
                      >
                        <span className="city-art">
                          <LegacyIcon name="building" />
                        </span>
                        <b>{city}</b>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="cph">
                <LegacyIcon name="map" />
                <b>Selecione um estado</b>
                <small>As cidades aparecem aqui</small>
              </div>
            )}
          </div>
        </div>

        <label className="lbl rv" htmlFor="custom-destination">
          Ou escreva outro destino
        </label>
        <input
          className="fi2 rv"
          id="custom-destination"
          value={form.destination}
          onChange={(event) => update({ destination: event.target.value })}
          placeholder="Ex.: São Paulo, Rio de Janeiro, Paraty, Ouro Preto, Salvador"
          autoComplete="off"
        />
      </div>
      <div className="rib" aria-hidden="true">
        <div className="trk" />
      </div>
    </section>
  );
}

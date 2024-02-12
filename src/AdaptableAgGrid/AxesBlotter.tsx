import * as React from 'react';
import { useMemo } from 'react';
import { Root } from 'react-dom/client';
import { GridOptions } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import AdaptableReact, {
  AdaptableApi,
  AdaptableOptions,
  ColumnFilter,
  HandleFdc3Context,
  HandleFdc3IntentContext,
} from '@adaptabletools/adaptable-react-aggrid';
import { columnDefs, defaultColDef } from './columnDefs';
import { rowData, SellBondInterest } from './rowData';
import { agGridModules } from './agGridModules';
import { renderReactRoot } from '../react-18-utils';
import '@interopio/theme-demo-apps/dist/io.applications.css';

const renderWeakMap: WeakMap<HTMLElement, Root> = new WeakMap();

const Revision = 2;

export const AxesBlotter = () => {
  const gridOptions = useMemo<GridOptions<SellBondInterest>>(
    () => ({
      defaultColDef,
      columnDefs,
      rowData,
      sideBar: true,

      suppressMenuHide: true,
      enableRangeSelection: true,
      enableCharts: true,
    }),
    [],
  );
  const adaptableOptions = useMemo<AdaptableOptions<SellBondInterest>>(
    () => ({
      // licenseKey: import.meta.env.VITE_ADAPTABLE_LICENSE_KEY,
      licenseKey:
        'AppName=interop-Trial|Owner=interop|StartDate=2023-11-23|EndDate=2024-01-23|Ref=AdaptableLicense|Trial=true|TS=1700741032831|C=2692006938,2271485454,4261170317,1260976079,180944542,4061129120,1409499958,3452034758',
      primaryKey: 'Id',
      userName: 'Test User',
      adaptableId: 'AdaptableFinsembleAxes',
      fdc3Options: {
        enableLogging: true,
        contexts: {
          listensFor: ['fdc3.instrument'],
          handleContext: (params: HandleFdc3Context) => {
            const { adaptableApi, context } = params;
            if (context.type !== 'fdc3.instrument') {
              return;
            }
            const isinValue = context.id?.ISIN;
            const isinFilter: ColumnFilter = {
              ColumnId: 'ISIN',
              Predicate: {
                PredicateId: 'Is',
                Inputs: [isinValue],
              },
            };
            adaptableApi.filterApi.setColumnFilters([isinFilter]);
          },
        },
        intents: {
          listensFor: ['ViewInstrument', 'ViewOrder'],
          handleIntent: (fdc3IntentContext: HandleFdc3IntentContext) => {
            console.log(`Received context: `, fdc3IntentContext);

            const { adaptableApi, context } = fdc3IntentContext;
            if (context.type !== 'fdc3.instrument') {
              return;
            }
            const isinValue = context.id?.ISIN;
            const isinFilter: ColumnFilter = {
              ColumnId: 'ISIN',
              Predicate: {
                PredicateId: 'Is',
                Inputs: [isinValue],
              },
            };
            adaptableApi.filterApi.setColumnFilters([isinFilter]);
          },
        },
      },
      predefinedConfig: {
        Dashboard: {
          Revision,
          DashboardTitle: 'Sell-side Bond Interests',
        },
        Theme: {
          Revision,
          CurrentTheme: 'dark',
        },
        FormatColumn: {
          Revision,
          FormatColumns: [
            {
              Scope: {
                ColumnIds: ['Quantity'],
              },
              DisplayFormat: {
                Formatter: 'NumberFormatter',
                Options: {
                  Suffix: 'M',
                  Multiplier: 0.000001,
                },
              },
            },
            {
              Scope: {
                DataTypes: ['Number'],
              },
              CellAlignment: 'Right',
            },
          ],
        },
      },
    }),
    [],
  );

  const adaptableApiRef = React.useRef<AdaptableApi>();

  return (
    <div
      className={'flex h-screen flex-col'}
      style={
        {
          '--ab-dashboard-header__background': 'hsl(191deg, 50%, 30%)',
        } as React.CSSProperties
      }
    >
      <AdaptableReact
        className={'flex-none'}
        gridOptions={gridOptions}
        adaptableOptions={adaptableOptions}
        renderReactRoot={(node, container) =>
          renderReactRoot(node, container, renderWeakMap)
        }
        onAdaptableReady={({ adaptableApi }) => {
          adaptableApiRef.current = adaptableApi;
        }}
      />
      <div className="ag-tick42 flex-1">
        <AgGridReact gridOptions={gridOptions} modules={agGridModules} />
      </div>
    </div>
  );
};
